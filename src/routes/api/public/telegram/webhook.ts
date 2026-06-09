import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";
import { generateText, stepCountIs, type ModelMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { ANIMA_MODEL, ANIMA_SYSTEM_PROMPT, createSubmitLeadTool } from "@/lib/anima-ai.server";

const MAX_HISTORY_MESSAGES = 20;
const PRODUCTION_BASE_URL = "https://animapraxis.lovable.app";

function deriveWebhookSecret(token: string): string {
  return createHash("sha256").update(`telegram-webhook:${token}`).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

async function sendTelegramMessage(token: string, chatId: number | string, text: string) {
  try {
    // Try Markdown first, fall back to plain text if Telegram rejects formatting.
    let res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error("[telegram-webhook] sendMessage (Markdown) failed", res.status, errBody);
      res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      });
      if (!res.ok) {
        console.error("[telegram-webhook] sendMessage (plain) failed", res.status, await res.text());
      }
    }
  } catch (err) {
    console.error("[telegram-webhook] sendMessage network error", err);
  }
}

export const Route = createFileRoute("/api/public/telegram/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token) {
          console.error("[telegram-webhook] TELEGRAM_BOT_TOKEN is not configured");
          return Response.json({ ok: true });
        }

        // Validate Telegram secret_token header
        const expected = deriveWebhookSecret(token);
        const provided = request.headers.get("X-Telegram-Bot-Api-Secret-Token") ?? "";
        if (!safeEqual(provided, expected)) {
          console.warn("[telegram-webhook] Invalid secret token header");
          return Response.json({ ok: true });
        }

        let update: any;
        try {
          update = await request.json();
        } catch (err) {
          console.error("[telegram-webhook] Invalid JSON body", err);
          return Response.json({ ok: true });
        }

        const message = update?.message ?? update?.edited_message;
        const chatId = message?.chat?.id;
        const rawText: string | undefined = message?.text;

        if (!chatId || typeof rawText !== "string" || !rawText.trim()) {
          return Response.json({ ok: true });
        }

        // Strip "/start" or other simple bot commands of trailing args
        const userText = rawText.replace(/^\/start(?:@\w+)?\s*/i, "").trim() ||
          "Hola, ¿en qué pueden ayudarme?";

        const lovableKey = process.env.LOVABLE_API_KEY;
        if (!lovableKey) {
          console.error("[telegram-webhook] LOVABLE_API_KEY not configured");
          await sendTelegramMessage(
            token,
            chatId,
            "Estamos teniendo un problema técnico. Por favor escríbenos a info@animapraxis.org o por WhatsApp +593 99 980 1101.",
          );
          return Response.json({ ok: true });
        }

        const chatKey = String(chatId);

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          // Load conversation history for this telegram chat_id
          const { data: row } = await supabaseAdmin
            .from("telegram_conversations")
            .select("messages")
            .eq("chat_id", chatKey)
            .maybeSingle();

          const history: ModelMessage[] = Array.isArray(row?.messages)
            ? (row!.messages as ModelMessage[])
            : [];

          const messages: ModelMessage[] = [
            ...history,
            { role: "user", content: userText },
          ];

          const gateway = createLovableAiGatewayProvider(lovableKey);
          const model = gateway(ANIMA_MODEL);

          const result = await generateText({
            model,
            system: ANIMA_SYSTEM_PROMPT,
            messages,
            tools: {
              submit_lead: createSubmitLeadTool({
                baseUrl: PRODUCTION_BASE_URL,
                origen: "ChatBot Anima Praxis (Telegram)",
              }),
            },
            stopWhen: stepCountIs(5),
          });

          const replyText = (result.text ?? "").trim() ||
            "Disculpa, no pude generar una respuesta. ¿Podrías reformular tu mensaje?";

          await sendTelegramMessage(token, chatId, replyText);

          // Persist updated history (truncate to last N to keep payload bounded)
          const updatedHistory = [
            ...messages,
            { role: "assistant" as const, content: replyText },
          ].slice(-MAX_HISTORY_MESSAGES);

          await supabaseAdmin
            .from("telegram_conversations")
            .upsert(
              {
                chat_id: chatKey,
                messages: updatedHistory as unknown as any,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "chat_id" },
            );
        } catch (err) {
          console.error("[telegram-webhook] AI/processing error", err);
          await sendTelegramMessage(
            token,
            chatId,
            "Tuvimos un problema procesando tu mensaje. Intenta de nuevo en unos minutos o escríbenos a info@animapraxis.org.",
          );
        }

        // Always 200 so Telegram does not retry
        return Response.json({ ok: true });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";
import { generateText, stepCountIs, type ModelMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { ANIMA_MODEL, buildAnimaSystemPrompt, createSubmitLeadTool } from "@/lib/anima-ai.server";

const MAX_HISTORY_MESSAGES = 20;
const PRODUCTION_BASE_URL = "https://animapraxis.org";

function deriveWebhookSecret(token: string): string {
  return createHash("sha256").update(`telegram-webhook:${token}`).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Convierte Markdown ligero del modelo a HTML compatible con Telegram.
 * - Links [text](url) → <b><u><a href="url">text</a></u></b> (enmascarado, negrita + subrayado)
 * - **bold** / __bold__ → <b>...</b>
 * - *italic* / _italic_ → <i>...</i>
 * - `code` → <code>...</code>
 * - Resto de texto se escapa.
 */
function markdownToTelegramHtml(input: string): string {
  type Token = { type: "raw"; value: string } | { type: "html"; value: string };
  let tokens: Token[] = [{ type: "raw", value: input }];

  const replaceRaw = (regex: RegExp, render: (m: RegExpExecArray) => string) => {
    const next: Token[] = [];
    for (const t of tokens) {
      if (t.type !== "raw") {
        next.push(t);
        continue;
      }
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      const r = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : regex.flags + "g");
      while ((m = r.exec(t.value)) !== null) {
        if (m.index > lastIndex) next.push({ type: "raw", value: t.value.slice(lastIndex, m.index) });
        next.push({ type: "html", value: render(m) });
        lastIndex = m.index + m[0].length;
      }
      if (lastIndex < t.value.length) next.push({ type: "raw", value: t.value.slice(lastIndex) });
    }
    tokens = next;
  };

  // 1. Links (primero para no romper con bold/italic alrededor)
  replaceRaw(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m) => {
    const text = escapeHtml(m[1]);
    const url = m[2].replace(/"/g, "%22");
    return `<b><u><a href="${url}">${text}</a></u></b>`;
  });
  // 2. Code inline
  replaceRaw(/`([^`]+)`/g, (m) => `<code>${escapeHtml(m[1])}</code>`);
  // 3. Bold
  replaceRaw(/\*\*([^*]+)\*\*/g, (m) => `<b>${escapeHtml(m[1])}</b>`);
  replaceRaw(/__([^_]+)__/g, (m) => `<b>${escapeHtml(m[1])}</b>`);
  // 4. Italic (single * or _)
  replaceRaw(/(?<![*\w])\*([^*\n]+)\*(?!\w)/g, (m) => `<i>${escapeHtml(m[1])}</i>`);
  replaceRaw(/(?<![_\w])_([^_\n]+)_(?!\w)/g, (m) => `<i>${escapeHtml(m[1])}</i>`);

  return tokens.map((t) => (t.type === "html" ? t.value : escapeHtml(t.value))).join("");
}

async function sendTelegramMessage(token: string, chatId: number | string, text: string) {
  const html = markdownToTelegramHtml(text);
  try {
    let res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error("[telegram-webhook] sendMessage (HTML) failed", res.status, errBody);
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
          console.log("Mensaje entrante de Telegram:", JSON.stringify(update));
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
            "Estamos teniendo un problema técnico. Por favor escríbenos a info@animapraxis.org o a través de [WhatsApp](https://wa.me/593999801101).",
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
            system: buildAnimaSystemPrompt("telegram"),
            messages,
            tools: {
              submit_lead: createSubmitLeadTool({
                // Usa el mismo origen al que llegó el webhook (animapraxis.org en prod),
                // así la petición interna a /lovable/email/transactional/send no
                // depende de redirecciones ni de un dominio hardcoded.
                baseUrl: new URL(request.url).origin || PRODUCTION_BASE_URL,
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

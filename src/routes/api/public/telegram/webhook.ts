import { createFileRoute } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "crypto";

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
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      console.error("[telegram-webhook] sendMessage failed", res.status, await res.text());
    }
  } catch (err) {
    console.error("[telegram-webhook] sendMessage network error", err);
  }
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const Route = createFileRoute("/api/public/telegram/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token) {
          console.error("[telegram-webhook] TELEGRAM_BOT_TOKEN is not configured");
          // Still 200 to avoid Telegram retries storm.
          return Response.json({ ok: true });
        }

        // Validate the request really comes from Telegram via the secret_token header
        // configured at setWebhook time (derived from the bot token).
        const expected = deriveWebhookSecret(token);
        const provided = request.headers.get("X-Telegram-Bot-Api-Secret-Token") ?? "";
        if (!safeEqual(provided, expected)) {
          // Unauthorized — but still 200 OK so Telegram does not retry malicious requests
          // forever; log for visibility.
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
        const text: string | undefined = message?.text;

        if (!chatId || typeof text !== "string") {
          return Response.json({ ok: true });
        }

        // Match "/start <user_id>" (optionally with @BotName)
        const match = text.match(/^\/start(?:@\w+)?\s+(\S+)/i);
        if (!match) {
          return Response.json({ ok: true });
        }

        const userId = match[1];
        if (!UUID_REGEX.test(userId)) {
          await sendTelegramMessage(
            token,
            chatId,
            "No pudimos vincular tu cuenta: identificador inválido. Vuelve a la web e inténtalo de nuevo.",
          );
          return Response.json({ ok: true });
        }

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data, error } = await supabaseAdmin.rpc("update_telegram_id", {
            user_id: userId,
            chat_id: String(chatId),
          });

          if (error || !data) {
            console.error("[telegram-webhook] update_telegram_id failed", error);
            await sendTelegramMessage(
              token,
              chatId,
              "Hubo un problema al vincular tu cuenta. Inténtalo de nuevo en unos minutos.",
            );
            return Response.json({ ok: true });
          }

          await sendTelegramMessage(
            token,
            chatId,
            "¡Cuenta vinculada con éxito! Ahora tu historial web y móvil están sincronizados.",
          );
        } catch (err) {
          console.error("[telegram-webhook] unexpected error", err);
        }

        // Always 200 to prevent Telegram retries.
        return Response.json({ ok: true });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, stepCountIs, streamText, type UIMessage } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { ANIMA_MODEL, ANIMA_SYSTEM_PROMPT, createSubmitLeadTool } from "@/lib/anima-ai.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as { messages?: unknown } | null;
        const MessagePartSchema = z.object({
          type: z.string().min(1).max(64),
          text: z.string().max(10_000).optional(),
        }).passthrough();
        const MessageSchema = z.object({
          id: z.string().max(128).optional(),
          role: z.enum(["system", "user", "assistant", "tool"]),
          content: z.union([z.string().max(10_000), z.array(MessagePartSchema).max(20)]).optional(),
          parts: z.array(MessagePartSchema).max(20).optional(),
        }).passthrough();
        const MessagesSchema = z.array(MessageSchema).min(1).max(50);
        const parsed = MessagesSchema.safeParse(body?.messages);
        if (!parsed.success) {
          return new Response("Invalid messages payload", { status: 400 });
        }
        const messages = parsed.data;

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway(ANIMA_MODEL);

        const result = streamText({
          model,
          system: ANIMA_SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
          tools: {
            submit_lead: createSubmitLeadTool({
              baseUrl: request.url,
              origen: "ChatBot Anima Praxis (sitio web)",
            }),
          },
          stopWhen: stepCountIs(5),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});

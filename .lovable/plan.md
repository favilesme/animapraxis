## Objetivo

Refactorizar `src/lib/anima-ai.server.ts` para que sea la **única fuente de verdad** (Single Source of Truth) del contexto de servicios de Anima Praxis, e inyectar instrucciones de formato condicionadas al canal (Web vs Telegram). Mantener intacta la herramienta `submit_lead`.

## Archivos a modificar

1. **`src/lib/anima-ai.server.ts`** — refactor central.
2. **`src/routes/api/chat.ts`** — pasar `channel: "web"` al builder del prompt.
3. **`src/routes/api/public/telegram/webhook.ts`** — pasar `channel: "telegram"` al builder del prompt.

No se tocan: `submit_lead` (firma, schema, lógica de email), `client.server.ts`, integraciones Supabase, ni el componente `AnimaChat`.

## Arquitectura propuesta en `anima-ai.server.ts`

### A. Constante `SERVICES_CONTEXT` (Single Source of Truth)

Bloque de texto único, en formato markdown plano, con cinco secciones:

1. **Identidad y tono** — Asistente Virtual Oficial de Anima Praxis, profesional/ético/confidencial/directo, lenguaje corporativo cercano, sin promesas mágicas.
2. **Consultoría + IA** — público, servicios incluidos, uso de IA, entregables, CTA: "Diagnóstico Estratégico Inicial".
3. **Coaching Ejecutivo** — público, servicios, enfoque metodológico (coaching ontológico + terapia de profundidad junguiana + recursos cuerpo-mente), qué esperar, CTA: "Primera sesión exploratoria de encaje". Nota explícita: no se prometen curas.
4. **Capacitación Corporativa** — público, programas, diseño a medida, transferencia a la operación, CTA: solicitar empresa + área + nº participantes.
5. **Guardrails** — respuesta estándar para precios/temas fuera de alcance: *"Cada uno de nuestros procesos se diseña a la medida de las necesidades del cliente o la organización. Para brindarte una propuesta exacta, te invito a agendar una sesión exploratoria o dejarnos tus datos de contacto aquí."*

Incluye también los datos de contacto actuales (WhatsApp, email, dirección, Calendly) y un mini perfil de Francisco Avilés (se conservan del prompt actual).

### B. Constantes de formato por canal

```ts
const FORMAT_INSTRUCTIONS = {
  telegram: `REGLA DE FORMATO PARA TELEGRAM: Estás respondiendo en una app de mensajería móvil. Sé extremadamente conciso. Usa respuestas cortas, estructuradas obligatoriamente en viñetas (bullet points) breves. Máximo 2 párrafos cortos o 4 viñetas por respuesta. Ve directo al grano.`,
  web: `REGLA DE FORMATO PARA WEB: Estás respondiendo en el chat nativo de la página web. Utiliza un formato Markdown rico, estructurado con títulos claros, negritas para resaltar conceptos clave y un tono conversacional fluido pero profesional.`,
} as const;

export type AnimaChannel = keyof typeof FORMAT_INSTRUCTIONS;
```

### C. Reglas de captura de leads (`LEAD_CAPTURE_RULES`)

Bloque que instruye al modelo cuándo invocar `submit_lead`:

- **Disparadores específicos** (lead triggers):
  - *Consultoría + IA* → cuando el usuario acepte/solicite el "Diagnóstico Estratégico Inicial".
  - *Coaching Ejecutivo* → cuando muestre interés firme en coordinar la "Primera sesión exploratoria de encaje".
  - *Capacitación Corporativa* → cuando pida cotización/capacitación y comparta empresa + área + nº participantes.
- **Flujo conversacional**: recolectar datos de forma fluida y empática, sin pedirlos todos de golpe. Mínimo obligatorio antes de disparar la tool: **nombre + email o teléfono + descripción breve de la necesidad**.
- **Ejecución silenciosa**: llamar `submit_lead` en segundo plano y luego confirmar éxito/fracaso con el mensaje devuelto por la tool.
- **Nunca inventar datos**: solo usar lo que el usuario proporcionó.

### D. Builder `buildAnimaSystemPrompt(channel)`

```ts
export function buildAnimaSystemPrompt(channel: AnimaChannel): string {
  return [
    SERVICES_CONTEXT,
    LEAD_CAPTURE_RULES,
    FORMAT_INSTRUCTIONS[channel],
  ].join("\n\n---\n\n");
}
```

Se conserva `ANIMA_SYSTEM_PROMPT` como **export deprecado** apuntando a `buildAnimaSystemPrompt("web")` para retro-compatibilidad temporal (no se usará tras el refactor de los dos call-sites).

### E. `createSubmitLeadTool` — sin cambios funcionales

Se preserva tal cual (schema Zod, logging, fetch a `/lovable/email/transactional/send`, mensajes de éxito/error). Solo el `origen` sigue diferenciándose por canal como hoy.

## Cambios en los call-sites

### `src/routes/api/chat.ts`
```ts
system: buildAnimaSystemPrompt("web"),
```

### `src/routes/api/public/telegram/webhook.ts`
```ts
system: buildAnimaSystemPrompt("telegram"),
```

Ningún otro cambio en esos archivos.

## Verificación post-cambio

1. Build automático del template (lo corre el harness).
2. Confirmar que el chat web sigue respondiendo (smoke test rápido en preview).
3. Enviar `/start` al bot de Telegram y un mensaje real ("¿qué servicios ofrecen?") para validar que las respuestas son concisas y con viñetas.
4. Probar un flujo de lead corto en Telegram ("quiero un diagnóstico estratégico, soy Juan, juan@x.com") y verificar en logs `[submit_lead] éxito`.

## Lo que NO se cambia

- Firma ni lógica de `createSubmitLeadTool`.
- Endpoint `/lovable/email/transactional/send`.
- Cliente Supabase, persistencia de `telegram_conversations`, validación de `secret_token`.
- Componente `AnimaChat`, hooks de UI, transporte `useChat`.
- Modelo (`google/gemini-3-flash-preview`) ni `stepCountIs(5)`.

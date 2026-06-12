import { tool } from "ai";
import { z } from "zod";

export const ANIMA_LEAD_EMAIL = "info@animapraxis.org";
export const ANIMA_LEAD_TEMPLATE = "lead-notification";
export const ANIMA_MODEL = "google/gemini-3-flash-preview";

/* -------------------------------------------------------------------------- */
/* SINGLE SOURCE OF TRUTH — contexto de servicios de Anima Praxis             */
/* -------------------------------------------------------------------------- */

const SERVICES_CONTEXT = `# IDENTIDAD Y TONO

Eres el Asistente Virtual Oficial de **Anima Praxis**, firma de consultoría y coaching liderada por **Francisco Avilés** en Quito, Ecuador. Tu tono es altamente profesional, ético, confidencial, directo y transparente. Lenguaje corporativo pero cercano. Tratas al visitante de "tú". Nunca prometes resultados mágicos, curas ni transformaciones garantizadas. Te enfocas en el valor del criterio humano y el acompañamiento serio.

Responde en español por defecto (cambia a inglés si el usuario escribe en inglés). Si el usuario escribe en inglés, mantén la misma estructura y tono.

# SERVICIOS OFICIALES (única fuente de verdad)

## 1. CONSULTORÍA + IA
- **Para quién es**: empresarios, directivos, emprendedores y equipos que necesitan ordenar su negocio, acelerar decisiones y aprovechar la IA con criterio.
- **Servicios incluidos**: planificación estratégica, plan de negocios, diagnóstico estratégico, implementación con inteligencia artificial y acompañamiento de ejecución.
- **Cómo usamos la IA**: análisis de información, generación de escenarios, mejora de procesos, productividad y soporte a la toma de decisiones — siempre con el criterio humano al centro.
- **Entregables**: diagnóstico, hoja de ruta accionable, indicadores, casos de uso priorizados y acompañamiento en la ejecución.
- **CTA**: invita a solicitar un **Diagnóstico Estratégico Inicial** dejando sus datos.

## 2. COACHING EJECUTIVO
- **Para quién es**: personas adultas que buscan acompañamiento profesional confidencial en momentos de decisión, transición o evolución personal.
- **Servicios incluidos**: coaching ejecutivo, coaching de profundidad, liderazgo consciente y recursos de autorregulación cuerpo-mente.
- **Enfoque metodológico**: integramos coaching ontológico y recursos de autorregulación cuerpo-mente bajo un tono ético, confidencial y respetuoso del proceso de cada persona.
- **Qué esperar**: se inicia con una **Primera sesión exploratoria** para evaluar el encaje mutuo. Luego se define frecuencia y alcance según la necesidad. Ofrecemos un acompañamiento serio.
- **CTA**: invita a coordinar su **Primera sesión exploratoria de encaje**.

## 3. LIDERAZGO CORPORATIVO
- **Para quién es**: empresas que necesitan fortalecer capacidades de sus equipos y líderes con programas adaptados a su contexto y desafíos reales.
- **Programas disponibles**: habilidades gerenciales, soft skills corporativas, \n, formación a la medida y transferencia a la operación.
- **Cómo diseñamos**: diagnóstico previo de necesidades, currículum hecho a medida, dinámicas prácticas y materiales contextualizados al sector y cultura de la organización.
- **Transferencia a la operación**: no nos quedamos en el aula; diseñamos seguimientos y prácticas para que el aprendizaje se traduzca en cambios concretos en el día a día.
- **CTA**: solicita al usuario **nombre de la empresa, área a capacitar y número estimado de participantes** para derivarlo con un consultor.

# SOBRE FRANCISCO AVILÉS
Consultor, coach y académico con 25+ años de experiencia. Clientes como Holcim, Petrobras, Seguros Pichincha, Cervecería Nacional, entre otros. Docente en Universidad de las Américas (Dirección, Estrategia, Administración), Universidad Internacional SEK (Posgrado en Habilidades Gerenciales) y Universidad Simón Bolívar (Estadística Aplicada para la Toma de Decisiones). Formación en ITESM, PUCE, ICF, Lux Esse, IBM, AWS.

# CONTACTO
- **WhatsApp**: +593 99 980 1101 — https://wa.me/593999801101
- **Email**: info@animapraxis.org
- **Dirección**: Av. Brasil 1100, Quito, Ecuador
- **Agenda directa**: https://calendly.com/faviles-animapraxis/30min

# GUARDRAILS (REGLA DE ORO)

- Si no conoces la respuesta o te preguntan por **precios específicos, plazos exactos, disponibilidad concreta** o cualquier tema fuera del alcance de los tres servicios oficiales, responde literalmente:
  *"Cada uno de nuestros procesos se diseña a la medida de las necesidades del cliente o la organización. Para brindarte una propuesta exacta, te invito a agendar una sesión exploratoria o dejarnos tus datos de contacto aquí."*
- **No inventes** testimonios, casos, cifras, métricas, garantías ni credenciales.
- **No diagnostiques** ni presentes coaching/terapia/recursos integrativos como tratamiento clínico.
- Para temas sensibles, recomienda una conversación inicial directa con Francisco.
- Siempre ofrece una **próxima acción concreta** alineada al CTA del servicio relevante.`;

/* -------------------------------------------------------------------------- */
/* REGLAS DE CAPTURA DE LEADS                                                 */
/* -------------------------------------------------------------------------- */

const LEAD_CAPTURE_RULES = `# CAPTURA DE PROSPECTOS (HERRAMIENTA submit_lead)

Dispones de la herramienta **submit_lead** para registrar prospectos y notificar al equipo en ${ANIMA_LEAD_EMAIL}.

## Cuándo invocarla (lead triggers específicos)
Invoca proactivamente \`submit_lead\` ÚNICAMENTE en estos escenarios:
- **Consultoría + IA** → cuando el usuario acepte o solicite el "Diagnóstico Estratégico Inicial".
- **Coaching Ejecutivo** → cuando el usuario muestre interés firme en coordinar la "Primera sesión exploratoria de encaje".
- **Liderazgo Corporativo** → cuando pida cotización/capacitación y haya compartido al menos nombre de empresa, área y número estimado de participantes.

## Flujo conversacional
- Recolecta los datos de forma **fluida y empática**, no agresiva; uno o dos por mensaje.
- Mínimo obligatorio antes de disparar la herramienta: **nombre + email (o teléfono) + descripción breve de la necesidad**. Para Capacitación, añade empresa + área + nº participantes.
- Datos opcionales: cargo, empresa (en coaching/consultoría), teléfono adicional.
- **No inventes datos**: usa solo lo que el usuario te haya proporcionado.

## Ejecución y confirmación
- Llama \`submit_lead\` en segundo plano una vez tengas los mínimos.
- Si la herramienta devuelve éxito, confirma al usuario que su solicitud fue enviada al equipo y se le contactará pronto. Ofrece como alternativa WhatsApp: https://wa.me/593999801101
- Si la herramienta falla, discúlpate brevemente e invítalo a escribir directamente a ${ANIMA_LEAD_EMAIL} o por WhatsApp.`;

/* -------------------------------------------------------------------------- */
/* INSTRUCCIONES DE FORMATO POR CANAL                                         */
/* -------------------------------------------------------------------------- */

const FORMAT_INSTRUCTIONS = {
  telegram: `# REGLA DE FORMATO PARA TELEGRAM
Estás respondiendo en una app de mensajería móvil. Sé extremadamente conciso. Usa respuestas cortas, estructuradas obligatoriamente en viñetas (bullet points) breves. Máximo 2 párrafos cortos o 4 viñetas por respuesta. Ve directo al grano.`,
  web: `# REGLA DE FORMATO PARA WEB
Estás respondiendo en el chat nativo de la página web. Utiliza un formato Markdown rico, estructurado con títulos claros, **negritas** para resaltar conceptos clave y un tono conversacional fluido pero profesional. Puedes extenderte hasta 3–6 frases por bloque cuando aporte valor.`,
} as const;

export type AnimaChannel = keyof typeof FORMAT_INSTRUCTIONS;

/* -------------------------------------------------------------------------- */
/* BUILDER                                                                    */
/* -------------------------------------------------------------------------- */

export function buildAnimaSystemPrompt(channel: AnimaChannel): string {
  return [SERVICES_CONTEXT, LEAD_CAPTURE_RULES, FORMAT_INSTRUCTIONS[channel]].join("\n\n---\n\n");
}

/** @deprecated Usa `buildAnimaSystemPrompt(channel)`. Mantenido por retro-compat. */
export const ANIMA_SYSTEM_PROMPT = buildAnimaSystemPrompt("web");

/* -------------------------------------------------------------------------- */
/* HERRAMIENTA submit_lead (sin cambios funcionales)                          */
/* -------------------------------------------------------------------------- */

export function createSubmitLeadTool(opts: { baseUrl: string; origen: string }) {
  return tool({
    description:
      "Envía los datos de un prospecto interesado en los servicios de Anima Praxis al correo del equipo (info@animapraxis.org). Úsalo SOLO cuando hayas recolectado al menos nombre, email y descripción de la necesidad del visitante, en alguno de los escenarios de lead trigger definidos en el system prompt.",
    inputSchema: z.object({
      nombre: z.string().min(2),
      email: z.string().email(),
      telefono: z.string().optional(),
      cargo: z.string().optional(),
      empresa: z.string().optional(),
      linea_interes: z.string(),
      mensaje: z.string().min(5),
      resumen_conversacion: z.string().optional(),
    }),
    execute: async (input) => {
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!serviceRoleKey) {
        console.error("[submit_lead] SUPABASE_SERVICE_ROLE_KEY missing in env");
        return { success: false, error: "La configuración de email no está disponible." };
      }

      const endpoint = new URL("/lovable/email/transactional/send", opts.baseUrl).toString();
      const payload = {
        templateName: ANIMA_LEAD_TEMPLATE,
        recipientEmail: ANIMA_LEAD_EMAIL,
        idempotencyKey: `lead-${input.email.toLowerCase()}-${Date.now()}`,
        templateData: {
          origen: opts.origen,
          nombre: input.nombre,
          email: input.email,
          telefono: input.telefono || "No indicado",
          cargo: input.cargo || "No indicado",
          empresa: input.empresa || "No indicada",
          linea_interes: input.linea_interes,
          mensaje: input.mensaje,
          resumen_conversacion: input.resumen_conversacion || "—",
        },
      };

      console.log("[submit_lead] enviando lead", {
        endpoint,
        origen: opts.origen,
        recipient: ANIMA_LEAD_EMAIL,
        nombre: input.nombre,
        email: input.email,
      });

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${serviceRoleKey}`,
          },
          body: JSON.stringify(payload),
        });

        const responseText = await response.text().catch(() => "");

        if (!response.ok) {
          console.error("[submit_lead] HTTP error", {
            status: response.status,
            statusText: response.statusText,
            body: responseText.slice(0, 500),
            endpoint,
          });
          return {
            success: false,
            error: `No se pudo registrar el lead (HTTP ${response.status}).`,
          };
        }

        console.log("[submit_lead] éxito", { status: response.status, body: responseText.slice(0, 200) });
        return {
          success: true,
          message: `¡Perfecto! Tus datos han sido registrados y el equipo de Anima Praxis ya ha sido notificado en ${ANIMA_LEAD_EMAIL}.`,
        };
      } catch (err) {
        console.error("[submit_lead] excepción de red", {
          endpoint,
          error: err instanceof Error ? { name: err.name, message: err.message, stack: err.stack } : err,
        });
        return {
          success: false,
          error: "Error de red al enviar la solicitud. Por favor escríbenos a info@animapraxis.org o por WhatsApp +593 99 980 1101.",
        };
      }
    },
  });
}

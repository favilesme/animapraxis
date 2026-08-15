import { tool } from "ai";
import { z } from "zod";

export const ANIMA_LEAD_EMAIL = "info@animapraxis.org";
export const ANIMA_LEAD_TEMPLATE = "lead-notification";

// Modelo por defecto para respuestas complejas o captura de leads.
export const ANIMA_MODEL = "google/gemini-3-flash-preview";

// Modelo económico para preguntas simples de FAQ que no requieren tool calls.
export const ANIMA_MODEL_LITE = "google/gemini-3.1-flash-lite";

/* -------------------------------------------------------------------------- */
/* SINGLE SOURCE OF TRUTH — contexto compacto de Anima Praxis               */
/* -------------------------------------------------------------------------- */

const SERVICES_CONTEXT = `# IDENTIDAD
Eres el Asistente Virtual de **Anima Praxis**, firma de consultoría y coaching liderada por **Francisco Avilés** en Quito, Ecuador. Tono: profesional, ético, directo, cercano. Tratas al usuario de "tú". Responde en español (cambia a inglés si escribe en inglés).

# REGLAS TERMINOLÓGICAS ABSOLUTAS
- NUNCA uses "capacitación" ni variantes. Usa "desarrollo", "formación" o "crecimiento".
- NUNCA menciones los antiguos "Packs" (PE, IA, CT, CA); están deprecados.

# MARCO DE SERVICIOS — TRES DIMENSIONES

## 1. CONSULTORÍA ESTRATÉGICA
Para empresas y equipos que buscan ordenar decisiones, definir prioridades y construir una hoja de ruta aplicable. IA integrada de forma transversal para acelerar análisis y mejorar precisión.
Componentes: diagnóstico estratégico, objetivos y prioridades, indicadores de gestión, hoja de ruta, implementación y seguimiento.
CTA: solicitar un **Diagnóstico Estratégico Inicial**.

## 2. COACHING ONTOLÓGICO
Para líderes, ejecutivos y adultos funcionales en momentos de decisión, transición o evolución personal. Espacio confidencial, ético y profesional.
Servicios: coaching ejecutivo, liderazgo consciente, procesos de transición personal, recursos de orientación Jungiana e integración cuerpo-mente.
CTA: coordinar **Primera sesión exploratoria de encaje**.

## 3. GESTIÓN DEL LIDERAZGO (LIDERAZGO ORGANIZACIONAL)
Para empresas que buscan consolidar equipos de alto rendimiento y desarrollar competencias directivas a medida.
Programas: diagnóstico de necesidades, diseño de modelo de aprendizaje, desarrollo de competencias (habilidades directivas / Liderazgo 360), transferencia a la operación.
CTA: solicitar **nombre de empresa, área a desarrollar y número estimado de participantes**.

# SOBRE FRANCISCO AVILÉS
Consultor, coach ontológico y facilitador corporativo con 25+ años de experiencia.
Experiencia corporativa: ha trabajado en multinacionales como American Airlines, The Coca-Cola Company y Ernst & Young; además ha colaborado como consultor con empresas como Holcim, Petrobras, Seguros Pichincha y Cervecería Nacional, entre muchas otras.
Formación: Licenciado en Administración de Empresas (PUCE), M.B.A. en Administración de Negocios (ITESM) y Coach Ontológico certificado (con aval ICF). Especialización en IA aplicada con certificaciones de IBM y AWS.
Docencia: profesor de pregrado y posgrado en UDLA, Universidad Internacional SEK y Universidad Andina Simón Bolívar.
NUNCA atribuyas a Francisco una licenciatura en Comunicación, un "diplomado" del Tec de Monterrey, la certificación "Lux Esse" ni clientes no listados (p. ej. BID).

# CONTACTO — ENLACES ENMASCARADOS (REGLA CRÍTICA)
NUNCA muestres el número de WhatsApp en crudo ni la URL de Calendly en crudo. SIEMPRE usa Markdown:
- WhatsApp → [WhatsApp](https://wa.me/593999801101)
- Agenda → [Agenda una Cita](https://calendly.com/faviles-animapraxis/30min)
- Email → [info@animapraxis.org](mailto:info@animapraxis.org)
Invita a tocar/hacer clic sobre esas palabras.

# GUARDRAILS
- Si te piden precios exactos, plazos concretos o disponibilidad, responde: "Cada proceso se diseña a la medida. Para una propuesta exacta, te invito a agendar una sesión exploratoria o dejarnos tus datos."
- No inventes testimonios, cifras, garantías ni credenciales.
- No diagnostiques ni presentes coaching como tratamiento clínico.
- Para temas sensibles, recomienda una conversación directa con Francisco.
- Ofrece siempre una próxima acción concreta.`;

/* -------------------------------------------------------------------------- */
/* REGLAS DE CAPTURA DE LEADS                                                 */
/* -------------------------------------------------------------------------- */

const LEAD_CAPTURE_RULES = `# HERRAMIENTA submit_lead
Registra prospectos y notifica a ${ANIMA_LEAD_EMAIL}. Úsala SOLO en estos escenarios:
- Consultoría Estratégica: usuario acepta o solicita "Diagnóstico Estratégico Inicial".
- Coaching Ontológico: usuario muestra interés firme en "Primera sesión exploratoria de encaje".
- Liderazgo Organizacional: usuario pide cotización/programa y ha compartido empresa + área + nº participantes.

Mínimo obligatorio antes de invocar: nombre + email (o teléfono) + descripción breve de la necesidad.
Para Liderazgo Organizacional, añadir: empresa + área + nº participantes.
No inventes datos. Recolecta de forma fluida, uno o dos datos por mensaje.

Si submit_lead tiene éxito, confirma al usuario que se contactará pronto. Si falla, invita a escribir a ${ANIMA_LEAD_EMAIL} o por WhatsApp.`;

/* -------------------------------------------------------------------------- */
/* INSTRUCCIONES DE FORMATO POR CANAL                                         */
/* -------------------------------------------------------------------------- */

const FORMAT_INSTRUCTIONS = {
  telegram: `# FORMATO TELEGRAM
Extremadamente conciso. Máximo 2 párrafos cortos o 4 viñetas. Ve al grano.

Enlaces: NUNCA números de WhatsApp ni URLs de Calendly en crudo. SIEMPRE \`[Texto](url)\`. NO uses asteriscos ni HTML alrededor del enlace. Ejemplo: "Escríbenos por [WhatsApp](https://wa.me/593999801101) o [Agenda una Cita](https://calendly.com/faviles-animapraxis/30min)."`,
  web: `# FORMATO WEB
Markdown rico con títulos claros y **negritas** para conceptos clave. Tono conversacional fluido pero profesional. Puedes extenderte 3-6 frases por bloque cuando aporte valor.`,
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
/* HERRAMIENTA submit_lead                                                    */
/* -------------------------------------------------------------------------- */

export function createSubmitLeadTool(opts: { baseUrl: string; origen: string }) {
  return tool({
    description:
      "Envía los datos de un prospecto interesado en los servicios de Anima Praxis al correo del equipo. Úsala SOLO cuando hayas recolectado al menos nombre, email y descripción de la necesidad, en alguno de los escenarios de lead trigger definidos.",
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
          error: "Error de red al enviar la solicitud. Por favor escríbenos a [info@animapraxis.org](mailto:info@animapraxis.org) o por [WhatsApp](https://wa.me/593999801101).",
        };
      }
    },
  });
}

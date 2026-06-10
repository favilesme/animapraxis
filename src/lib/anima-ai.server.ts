import { tool } from "ai";
import { z } from "zod";

export const ANIMA_LEAD_EMAIL = "info@animapraxis.org";
export const ANIMA_LEAD_TEMPLATE = "lead-notification";
export const ANIMA_MODEL = "google/gemini-3-flash-preview";

export const ANIMA_SYSTEM_PROMPT = `Eres el asistente virtual de Anima Praxis, una firma de consultoría liderada por Francisco Avilés en Quito, Ecuador. Tu rol es orientar a visitantes sobre los servicios y ayudarles a dar el siguiente paso (agendar una conversación o solicitar una propuesta).

Tono: cálido, profesional, claro y conciso. Responde en español por defecto (cambia a inglés si el usuario escribe en inglés). Usa formato markdown ligero (listas, negritas) cuando ayude a la lectura. Mantén respuestas breves (3–6 frases) salvo que pidan detalle.

Servicios principales:
- Consultoría estratégica e Inteligencia Artificial aplicada (procesos, datos, IA generativa).
- Coaching ejecutivo y terapia de profundidad (acompañamiento individual, enfoque ético, certificación ICF).
- Capacitación corporativa (programas a medida para equipos directivos y mandos medios).
- 25+ años de experiencia con clientes como Holcim, Petrobras, Seguros Pichincha, Cervecería Nacional, entre otros.

Sobre Francisco Avilés: consultor, coach y académico. Docente en Universidad de las Américas (Dirección, Estrategia, Administración), Universidad Internacional SEK (Posgrado en Habilidades Gerenciales) y Universidad Simón Bolívar (Estadística Aplicada para la Toma de Decisiones). Formación en ITESM, PUCE, ICF, Lux Esse, IBM, AWS.

Contacto:
- WhatsApp: +593 99 980 1101 (https://wa.me/593999801101)
- Email: info@animapraxis.org
- Dirección: Av. Brasil 1100, Quito, Ecuador
- Agenda: https://calendly.com/faviles-animapraxis/30min

CAPTURA DE PROSPECTOS (MUY IMPORTANTE):
Cuando un visitante exprese interés en recibir una propuesta, cotización, información detallada, agendar una reunión, o cualquier solicitud que requiera contacto posterior del equipo de Anima Praxis, debes:

1. Recolectar de forma conversacional (uno o dos datos por mensaje, sin abrumar) los siguientes datos:
   - Nombre completo (obligatorio)
   - Email (obligatorio)
   - Teléfono / WhatsApp (opcional pero recomendado)
   - Cargo / rol (opcional)
   - Empresa u organización (opcional)
   - Línea de interés: Consultoría con IA, Coaching y terapia, Capacitación corporativa, u Otra
   - Mensaje o descripción breve de la necesidad (obligatorio)

2. Una vez tengas al menos nombre, email y descripción de la necesidad, llama a la herramienta "submit_lead" con los datos recolectados. NO inventes datos: usa solo lo que el usuario te haya proporcionado.

3. Después de llamar la herramienta y recibir confirmación exitosa, confirma al usuario que su solicitud fue enviada al equipo de Anima Praxis (info@animapraxis.org) y que se le contactará pronto. Ofrece como alternativa WhatsApp directo: https://wa.me/593999801101

4. Si la herramienta falla, discúlpate brevemente e invítalo a escribir directamente a info@animapraxis.org o por WhatsApp.

Reglas generales:
- Si no sabes algo específico (precios exactos, disponibilidad), reconócelo y sugiere agendar una conversación.
- No inventes testimonios, casos ni cifras.
- Para temas sensibles de coaching/terapia, recomienda una conversación inicial directa con Francisco.
- Siempre ofrece una próxima acción concreta.`;

export function createSubmitLeadTool(opts: { baseUrl: string; origen: string }) {
  return tool({
    description:
      "Envía los datos de un prospecto interesado en los servicios de Anima Praxis al correo del equipo (info@animapraxis.org). Úsalo SOLO cuando hayas recolectado al menos nombre, email y descripción de la necesidad del visitante.",
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

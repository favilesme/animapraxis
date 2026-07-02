/**
 * Respuestas predefinidas para las intenciones más frecuentes del chatbot.
 * Usar estas respuestas evita llamadas a AI Gateway para preguntas comunes
 * y reduce el consumo de créditos diarios.
 *
 * Cada clave es un conjunto de palabras/frases que se buscan en el mensaje
 * del usuario (insensitive, sin tildes). Si hay coincidencia, se devuelve la
 * respuesta correspondiente.
 */

export type CachedIntent = {
  /** Frases exactas o parciales que activan esta respuesta. */
  triggers: string[];
  /** Respuesta en español (Markdown). */
  response: string;
};

export const CACHED_RESPONSES: CachedIntent[] = [
  {
    triggers: [
      "que servicios ofrecen",
      "que hacen",
      "servicios",
      "en que pueden ayudarme",
      "que hace anima praxis",
    ],
    response: `Anima Praxis trabaja en tres dimensiones integradas:

- **Consultoría Estratégica**: diagnóstico, planificación, KPIs y hoja de ruta con IA transversal.
- **Coaching Ontológico**: acompañamiento para líderes y ejecutivos en decisiones, transiciones y liderazgo consciente.
- **Liderazgo Organizacional**: desarrollo de equipos y competencias directivas a medida de cada empresa.

Si me cuentas un poco de tu situación, puedo orientarte hacia la dimensión más útil. También puedes [Agenda una Cita](https://calendly.com/faviles-animapraxis/30min) o escribirnos por [WhatsApp](https://wa.me/593999801101).`,
  },
  {
    triggers: [
      "como agendo",
      "agendar cita",
      "reservar cita",
      "como coordino una reunion",
      "primera conversacion",
      "primera evaluacion",
    ],
    response: `Puedes agendar una conversación directamente con Francisco en el horario que te quede más cómodo:

👉 [Agenda una Cita](https://calendly.com/faviles-animapraxis/30min)

También puedes escribirnos por [WhatsApp](https://wa.me/593999801101) y te ayudamos a coordinar.`,
  },
  {
    triggers: [
      "quien es francisco",
      "francisco aviles",
      "experiencia",
      "formacion",
      "credenciales",
    ],
    response: `Francisco Avilés es consultor empresarial, coach ontológico profesional con aval ICF y facilitador corporativo. Cuenta con más de 25 años de experiencia aplicada en estrategia, liderazgo, desarrollo humano e inteligencia artificial.

Ha acompañado a empresas como Holcim, Petrobras, Seguros Pichincha y Cervecería Nacional, y es docente en universidades como UDLA, SEK y Simón Bolívar.

Puedes conocer más en la página [Sobre Francisco](/sobre-francisco) o [Agenda una Cita](https://calendly.com/faviles-animapraxis/30min).`,
  },
  {
    triggers: [
      "contacto",
      "email",
      "correo",
      "telefono",
      "whatsapp",
      "como los contacto",
    ],
    response: `Puedes contactarnos de estas formas:

- [WhatsApp](https://wa.me/593999801101)
- [Agenda una Cita](https://calendly.com/faviles-animapraxis/30min)
- [info@animapraxis.org](mailto:info@animapraxis.org)
- Dirección: Av. Brasil 1100, Quito, Ecuador

¿En qué puedo orientarte antes de que hablemos?`,
  },
  {
    triggers: [
      "consultoria",
      "consultoria estrategica",
      "plan estrategico",
      "diagnostico estrategico",
    ],
    response: `La **Consultoría Estratégica** de Anima Praxis ayuda a empresas y equipos a ordenar decisiones, definir prioridades y construir una hoja de ruta aplicable. Integramos IA de forma transversal para acelerar el análisis y mejorar la precisión.

Los componentes clave son: diagnóstico estratégico, objetivos y prioridades, indicadores de gestión, hoja de ruta, e implementación con seguimiento.

Si te interesa, puedes solicitar un **Diagnóstico Estratégico Inicial** dejándome tu nombre, email y una breve descripción de tu situación.`,
  },
  {
    triggers: [
      "coaching",
      "coaching ontologico",
      "coaching ejecutivo",
      "terapia",
      "transicion personal",
      "proceso de transicion",
    ],
    response: `El **Coaching Ontológico** está dirigido a líderes, ejecutivos y adultos funcionales que buscan claridad, foco y acompañamiento profesional en momentos de decisión o transición.

Se inicia con una **Primera sesión exploratoria de encaje** para evaluar si el enfoque calza con tu necesidad. Luego se define frecuencia y alcance.

¿Te gustaría coordinar una primera sesión? Puedes [Agenda una Cita](https://calendly.com/faviles-animapraxis/30min) o dejarme tus datos de contacto.`,
  },
  {
    triggers: [
      "liderazgo",
      "formacion",
      "desarrollo corporativo",
      "equipos",
      "habilidades directivas",
      "capacitacion",
    ],
    response: `La dimensión de **Liderazgo Organizacional** diseña programas de desarrollo a medida de cada empresa: diagnóstico de necesidades, modelo de aprendizaje integrado, desarrollo de competencias directivas y transferencia a la operación.

Para orientarte mejor, necesitaría saber: nombre de la empresa, área o competencia a desarrollar, y número estimado de participantes.

¿Tienes esos datos a mano?`,
  },
  {
    triggers: [
      "precio",
      "costo",
      "honorarios",
      "cuanto cuesta",
      "tarifa",
      "presupuesto",
    ],
    response: `Cada proceso de Anima Praxis se diseña a la medida del alcance, duración y necesidades del cliente o la organización. Por eso no manejamos precios fijos en línea.

Para darte una propuesta exacta, te invito a agendar una sesión exploratoria o dejarnos tus datos de contacto aquí.`,
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Busca una respuesta cacheada para el mensaje del usuario.
 * Devuelve `undefined` si no hay coincidencia.
 */
export function getCachedResponse(userText: string): string | undefined {
  const normalized = normalize(userText);
  for (const intent of CACHED_RESPONSES) {
    for (const trigger of intent.triggers) {
      if (normalized.includes(normalize(trigger))) {
        return intent.response;
      }
    }
  }
  return undefined;
}

/**
 * Indica si el mensaje parece ser una pregunta simple de FAQ.
 * Útil para decidir si usar un modelo más económico o cache.
 */
export function isSimpleFAQ(userText: string): boolean {
  return getCachedResponse(userText) !== undefined;
}

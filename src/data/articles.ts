import estrategiaImg from "@/assets/insights/estrategia.jpg";
import iaImg from "@/assets/insights/ia-aplicada.jpg";
import liderazgoImg from "@/assets/insights/liderazgo.jpg";
import coachingImg from "@/assets/insights/coaching.jpg";
import terapiaImg from "@/assets/insights/terapia.jpg";
import capacitacionImg from "@/assets/insights/capacitacion.jpg";

export type Article = {
  slug: string;
  categoria: string;
  titulo: string;
  metaDescripcion: string;
  resumen: string;
  fecha: string;
  fechaCorta: string;
  tiempoLectura: string;
  autor: string;
  imagen: string;
  ctaTarjeta: string;
  introduccion: string[];
  ideas: { titulo: string; texto: string }[];
  ejemploTitulo: string;
  ejemplo: string[];
  errores: { titulo: string; texto: string }[];
  recomendaciones: string[];
  cierre: string[];
  cta: string;
};

export const articles: Article[] = [
  {
    slug: "estrategia-en-tiempos-de-cambio",
    categoria: "Estrategia",
    titulo: "Estrategia en tiempos de cambio: decidir mejor antes de actuar más",
    metaDescripcion:
      "La estrategia ayuda a enfocar decisiones, recursos y equipos en entornos acelerados, inciertos y competitivos.",
    resumen:
      "La estrategia ayuda a ordenar decisiones, foco y recursos cuando el entorno cambia rápido.",
    fecha: "15 de enero de 2026",
    fechaCorta: "15 enero 2026",
    tiempoLectura: "5 min de lectura",
    autor: "Francisco Avilés",
    imagen: estrategiaImg,
    ctaTarjeta: "Define tu ruta estratégica",
    introduccion: [
      "La estrategia no es un documento para archivar. Es una forma de pensar, decidir y actuar con dirección. En un entorno acelerado, las organizaciones que avanzan sin claridad terminan dispersando recursos, talento y energía. Una estrategia bien trabajada ayuda a elegir prioridades, ordenar decisiones y conectar a las personas con un propósito operativo.",
      "Hoy muchas empresas trabajan bajo presión. Cambios tecnológicos, clientes más exigentes, competencia digital, costos altos y equipos saturados crean una sensación de urgencia permanente.",
      "Frente a ese escenario, muchas organizaciones responden con más reuniones, más iniciativas y más tareas. El problema no es la falta de acción. El problema es la falta de dirección.",
      "La estrategia sirve para decidir qué sí, qué no, por qué, con qué recursos y hacia qué resultado. En tiempos de cambio, la estrategia deja de ser un ejercicio anual y se convierte en una disciplina de gestión.",
      "El World Economic Forum señala que la brecha de habilidades sigue siendo una barrera central para la transformación empresarial, con cerca del 40% de las habilidades laborales sujetas a cambio hacia 2030 y 63% de empleadores citando esa brecha como obstáculo principal. Esto confirma que la estrategia ya no trata únicamente de mercado, también trata de capacidades humanas y organizacionales.",
    ],
    ideas: [
      {
        titulo: "La estrategia da foco",
        texto:
          "Una empresa sin foco se llena de proyectos desconectados. Cada área defiende sus prioridades. Cada líder empuja su agenda. El resultado es desgaste. La estrategia obliga a ordenar. Define los pocos temas que merecen atención directiva, inversión y seguimiento.",
      },
      {
        titulo: "La estrategia mejora la calidad de las decisiones",
        texto:
          "Cuando el entorno cambia, la velocidad importa. Pero decidir rápido sin criterio produce errores caros. Una estrategia clara crea filtros. Ayuda a evaluar oportunidades, descartar distracciones y asignar recursos con mayor consistencia.",
      },
      {
        titulo: "La estrategia conecta dirección con ejecución",
        texto:
          "El plan estratégico pierde valor cuando no llega a la operación. La pregunta clave no es “qué queremos lograr”, sino “qué debe cambiar en la forma de trabajar para lograrlo”. Esa diferencia marca la distancia entre una declaración bonita y una ejecución seria.",
      },
      {
        titulo: "La estrategia exige conversaciones honestas",
        texto:
          "Muchas empresas evitan conversaciones incómodas. No revisan márgenes, cultura, roles, capacidades, liderazgo ni procesos. Una estrategia madura obliga a mirar la realidad. Sin diagnóstico, no hay avance sostenible.",
      },
      {
        titulo: "La estrategia integra desarrollo humano",
        texto:
          "Los resultados no los ejecutan los documentos. Los ejecutan personas con claridad, compromiso y capacidad de acción. Cuando las personas no entienden la dirección, el plan se vuelve ruido. Cuando la entienden, el trabajo gana sentido.",
      },
    ],
    ejemploTitulo: "Ejemplo aplicado al mundo empresarial",
    ejemplo: [
      "Una empresa de servicios profesionales quiere crecer 30% en un año. Su primera reacción es vender más. Contrata más vendedores, lanza campañas y presiona al equipo comercial.",
      "Después de tres meses, las ventas suben poco y la operación se sobrecarga.",
      "Un análisis estratégico muestra otra realidad. La empresa no tiene propuesta de valor clara, atiende clientes poco rentables, responde tarde, no mide satisfacción y depende demasiado del fundador.",
      "La estrategia cambia el enfoque. En lugar de “vender más”, la prioridad se redefine así: crecer con clientes de mayor valor, mejorar tiempos de respuesta, fortalecer mandos medios y paquetizar servicios.",
      "Con esa claridad, ventas, operaciones y liderazgo trabajan sobre la misma ruta. El crecimiento deja de depender de esfuerzo aislado y empieza a sostenerse en decisiones alineadas.",
    ],
    errores: [
      {
        titulo: "Confundir estrategia con planificación extensa",
        texto:
          "Un documento largo no garantiza claridad. La estrategia necesita síntesis, decisiones y seguimiento.",
      },
      {
        titulo: "Copiar modelos de otras empresas",
        texto:
          "Lo que funciona en una organización no siempre funciona en otra. Cada empresa tiene cultura, capacidades, restricciones y oportunidades propias.",
      },
      {
        titulo: "Definir demasiadas prioridades",
        texto: "Cuando todo es prioridad, nada lo es. Una empresa madura elige y renuncia.",
      },
      {
        titulo: "Separar estrategia y personas",
        texto:
          "El plan fracasa cuando no considera liderazgo, comunicación, hábitos, competencias y resistencias internas.",
      },
      {
        titulo: "Medir actividad en lugar de avance",
        texto:
          "No basta contar reuniones, capacitaciones o tareas. Hay que medir resultados, aprendizaje y cambios reales en la operación.",
      },
    ],
    recomendaciones: [
      "Revisa si tu organización tiene una dirección clara en una frase simple.",
      "Identifica los tres temas que más impactan el futuro del negocio.",
      "Evalúa qué iniciativas consumen recursos sin aportar valor estratégico.",
      "Conecta cada objetivo con responsables, métricas y decisiones de gestión.",
      "Escucha a tus equipos. La ejecución muestra problemas que la alta dirección no siempre ve.",
      "Agenda revisiones estratégicas trimestrales. No esperes al cierre anual para corregir.",
    ],
    cierre: [
      "La estrategia no elimina la incertidumbre. Te ayuda a actuar con criterio dentro de ella.",
      "Una organización estratégica no adivina el futuro. Se prepara mejor, decide mejor y aprende más rápido.",
      "Cuando la estrategia integra negocio, liderazgo y desarrollo humano, la empresa deja de reaccionar y empieza a construir dirección.",
    ],
    cta: "Si tu organización necesita ordenar prioridades, alinear equipos y transformar intención en acción, en Anima Praxis acompañamos procesos estratégicos diseñados para tu realidad. Agenda una conversación con Francisco Avilés y define el próximo paso con claridad.",
  },
  {
    slug: "ia-aplicada-con-estrategia",
    categoria: "Inteligencia Artificial Aplicada",
    titulo: "IA aplicada con estrategia: productividad con dirección, no con improvisación",
    metaDescripcion:
      "La IA aplicada genera valor cuando responde a prioridades claras, procesos reales y métricas de negocio.",
    resumen:
      "La IA genera valor cuando responde a prioridades claras, procesos reales y métricas de negocio.",
    fecha: "6 de febrero de 2026",
    fechaCorta: "6 febrero 2026",
    tiempoLectura: "6 min de lectura",
    autor: "Francisco Avilés",
    imagen: iaImg,
    ctaTarjeta: "Conversemos sobre IA aplicada",
    introduccion: [
      "La inteligencia artificial aplicada no consiste en usar herramientas por moda. Consiste en mejorar procesos, decisiones y productividad con dirección estratégica. La diferencia entre experimentar y generar valor está en elegir bien los casos de uso, preparar a las personas y medir impacto en la operación.",
      "Muchas empresas ya usan inteligencia artificial. Pocas la han convertido en una capacidad organizada.",
      "McKinsey reportó en 2025 que 88% de las organizaciones encuestadas usan IA en al menos una función de negocio, pero también señaló que muchas aún no han logrado escalar su valor.",
      "Ese dato muestra una brecha clara. Adoptar IA no equivale a transformarse. Tener herramientas no equivale a mejorar productividad. Automatizar tareas no equivale a construir ventaja competitiva.",
      "La IA aplicada necesita estrategia. Sin estrategia, la organización llena su operación de pruebas aisladas, suscripciones dispersas y expectativas confusas. Con estrategia, la IA se convierte en una palanca de productividad, aprendizaje y mejora de decisiones.",
    ],
    ideas: [
      {
        titulo: "La IA debe responder a prioridades del negocio",
        texto:
          "Antes de elegir una herramienta, conviene responder preguntas concretas. ¿Qué proceso queremos mejorar? ¿Qué costo queremos reducir? ¿Qué experiencia queremos elevar? ¿Qué decisión queremos tomar mejor? La tecnología entra después de la claridad.",
      },
      {
        titulo: "La productividad no se mide por usar más IA",
        texto:
          "La productividad se mide por resultados. Menos tiempo en tareas repetitivas. Mayor calidad de análisis. Menos errores. Mejor atención al cliente. Mayor velocidad comercial. Mejores decisiones. La IA aplicada exige métricas visibles.",
      },
      {
        titulo: "Los casos de uso deben nacer de la operación",
        texto:
          "Un caso de uso útil no nace en una presentación tecnológica. Nace en un dolor concreto. Reportes lentos, cotizaciones manuales, seguimiento comercial débil, análisis de datos disperso, atención repetitiva, documentación interna desordenada. Ahí aparece el valor.",
      },
      {
        titulo: "La IA requiere rediseño de procesos",
        texto:
          "Si automatizas un proceso mal diseñado, aceleras el desorden. La IA funciona mejor cuando la organización revisa pasos, roles, datos, aprobaciones y estándares de calidad.",
      },
      {
        titulo: "Las personas necesitan criterio",
        texto:
          "Stanford HAI señaló en su AI Index 2025 que la investigación muestra efectos positivos de la IA en productividad y reducción de brechas de habilidades en muchos casos. Aun así, esos beneficios dependen del contexto, la tarea y la forma de adopción. La IA no reemplaza el juicio directivo. Lo exige.",
      },
    ],
    ejemploTitulo: "Ejemplo aplicado al mundo empresarial",
    ejemplo: [
      "Una empresa de capacitación quiere incorporar IA para mejorar su operación. La primera idea es comprar varias herramientas: un generador de presentaciones, un chatbot, un transcriptor y una plataforma de automatización.",
      "Después de algunas pruebas, el equipo se confunde. Cada persona usa herramientas distintas. No hay estándares. Los resultados varían.",
      "Un enfoque estratégico cambia la secuencia. Primero se identifican tres procesos críticos: diseño de propuestas comerciales, personalización de programas de capacitación y seguimiento posterior a talleres.",
      "Luego se definen casos de uso: crear borradores de propuestas con estructura comercial, analizar necesidades del cliente a partir de entrevistas, generar recursos de aplicación para participantes y resumir retroalimentación para proponer mejoras.",
      "Por último, se crean reglas de uso, plantillas, responsables y métricas. La IA deja de ser novedad y se convierte en método.",
    ],
    errores: [
      {
        titulo: "Adoptar IA por presión externa",
        texto: "Usar una herramienta porque todos hablan de ella no garantiza valor.",
      },
      {
        titulo: "Delegar la IA únicamente al área tecnológica",
        texto:
          "La IA aplicada necesita negocio, procesos, talento humano, liderazgo y gestión del cambio.",
      },
      {
        titulo: "No cuidar datos ni confidencialidad",
        texto:
          "Una organización debe definir qué información entra en cada herramienta, quién accede y cómo se revisan los resultados.",
      },
      {
        titulo: "Medir uso, no impacto",
        texto: "Decir “usamos IA” dice poco. La pregunta correcta es: ¿qué mejoró?",
      },
      {
        titulo: "No capacitar a líderes y equipos",
        texto:
          "La IA requiere nuevos hábitos de trabajo. Sin formación, aparecen miedo, mal uso o dependencia.",
      },
    ],
    recomendaciones: [
      "Haz un mapa de procesos con alto consumo de tiempo y bajo valor agregado.",
      "Selecciona tres casos de uso con impacto visible en productividad o calidad.",
      "Define métricas antes de implementar.",
      "Crea guías internas de uso responsable.",
      "Entrena a líderes en preguntas, criterio y revisión de resultados.",
      "Integra IA con estrategia, no con improvisación.",
      "Evalúa el impacto cada 30 o 60 días.",
    ],
    cierre: [
      "La IA aplicada no se trata de reemplazar personas. Se trata de liberar capacidad humana para análisis, relación, criterio y acción.",
      "La organización que gana no será la que use más herramientas. Será la que entienda mejor sus procesos, prepare mejor a sus personas y conecte la tecnología con objetivos claros.",
      "La IA necesita dirección. La estrategia le da sentido.",
    ],
    cta: "Si quieres implementar IA aplicada sin dispersión, en Anima Praxis diseñamos rutas de adopción conectadas con tu estrategia, tus procesos y tu equipo. Agenda una conversación con Francisco Avilés y transforma la IA en productividad medible.",
  },
  {
    slug: "liderazgo-consciente-claridad-sentido",
    categoria: "Liderazgo",
    titulo: "Liderazgo consciente: claridad, sentido y desarrollo personal para dirigir mejor",
    metaDescripcion:
      "El liderazgo consciente fortalece claridad, coherencia y compromiso en equipos que enfrentan presión y cambio.",
    resumen:
      "Liderar hoy exige presencia, criterio, coherencia y capacidad de sostener conversaciones que movilicen.",
    fecha: "12 de marzo de 2026",
    fechaCorta: "12 marzo 2026",
    tiempoLectura: "5 min de lectura",
    autor: "Francisco Avilés",
    imagen: liderazgoImg,
    ctaTarjeta: "Fortalece tu liderazgo",
    introduccion: [
      "Liderar hoy exige más que dirigir tareas. Exige claridad, presencia, escucha, coherencia y capacidad de sostener conversaciones difíciles. El liderazgo consciente integra resultados y desarrollo personal. Ayuda a crear equipos con dirección, confianza y compromiso.",
      "Los líderes actuales enfrentan una presión distinta. Deben cumplir metas, adaptar equipos, incorporar tecnología, sostener cultura, cuidar talento y responder ante cambios permanentes.",
      "Gallup reportó una caída global del compromiso laboral en 2025 y vinculó parte importante de ese deterioro con la caída del compromiso en los mandos medios. También estimó una pérdida de US$438 mil millones en productividad asociada a esa baja de compromiso.",
      "El liderazgo consciente responde a ese desafío desde una idea simple: no se dirige bien hacia afuera cuando no existe claridad hacia adentro.",
      "Un líder que no se conoce reacciona. Un líder con mayor conciencia observa, decide y conversa mejor.",
    ],
    ideas: [
      {
        titulo: "Liderazgo consciente significa claridad personal",
        texto:
          "El líder necesita saber qué defiende, qué prioriza y qué tipo de impacto quiere generar. Sin claridad interna, el estilo de dirección cambia con la presión del día.",
      },
      {
        titulo: "Liderazgo consciente significa sentido",
        texto:
          "Las personas no se comprometen únicamente con tareas. Se comprometen cuando entienden por qué su trabajo importa. El líder traduce la estrategia en sentido operativo.",
      },
      {
        titulo: "Liderazgo consciente significa coherencia",
        texto:
          "La coherencia se nota en decisiones, conversaciones, tiempos, prioridades y trato. Cuando el líder dice una cosa y premia otra, el equipo pierde confianza.",
      },
      {
        titulo: "Liderazgo consciente significa presencia",
        texto:
          "Presencia no es estar disponible todo el día. Es atender lo importante con calidad. Escuchar sin interrumpir. Preguntar antes de imponer. Observar antes de reaccionar.",
      },
      {
        titulo: "Liderazgo consciente significa desarrollo personal",
        texto:
          "Liderar activa heridas, miedos, orgullo, inseguridad, necesidad de control y deseo de reconocimiento. Ignorar esa dimensión no elimina su influencia. La lleva a la cultura.",
      },
    ],
    ejemploTitulo: "Ejemplo aplicado al mundo empresarial",
    ejemplo: [
      "Un gerente comercial dirige un equipo con buenos vendedores, pero bajo compromiso. Las reuniones son tensas. El líder presiona por resultados, corrige en público y escucha poco.",
      "El equipo cumple lo mínimo. Evita proponer ideas. Cada persona protege su territorio.",
      "En un proceso de desarrollo, el gerente identifica un patrón: cuando siente pérdida de control, aumenta la presión. Cree que así genera responsabilidad, pero produce distancia.",
      "El trabajo se enfoca en tres cambios: reuniones con agenda clara y espacio para obstáculos reales; conversaciones individuales orientadas a aprendizaje, no a reproche; y métricas compartidas con seguimiento semanal.",
      "En pocas semanas, el equipo gana claridad. El líder no se vuelve blando. Se vuelve más preciso. Menos reactivo. Más consistente.",
    ],
    errores: [
      {
        titulo: "Confundir liderazgo con control",
        texto: "Controlar cada detalle reduce autonomía y aprendizaje.",
      },
      {
        titulo: "Creer que el cargo garantiza autoridad",
        texto:
          "El cargo entrega posición. La autoridad se construye con confianza, criterio y consistencia.",
      },
      {
        titulo: "Evitar conversaciones difíciles",
        texto:
          "Lo que no se conversa se convierte en rumor, resistencia o deterioro de desempeño.",
      },
      {
        titulo: "Separar resultados de cultura",
        texto: "Una cultura débil encarece cada resultado. Todo requiere más esfuerzo.",
      },
      {
        titulo: "Ignorar el estado emocional del líder",
        texto:
          "El estrés no gestionado se transmite. El equipo lo recibe como presión, irritabilidad o confusión.",
      },
    ],
    recomendaciones: [
      "Define tus tres prioridades como líder para los próximos 90 días.",
      "Pregunta a tu equipo qué obstáculo limita su desempeño.",
      "Revisa si tus métricas fomentan colaboración o competencia interna dañina.",
      "Agenda conversaciones individuales con foco en claridad y responsabilidad.",
      "Observa tus reacciones bajo presión. Ahí aparece tu estilo real.",
      "Pide retroalimentación específica sobre tu comunicación.",
      "Conecta cada meta con un sentido claro para el equipo.",
    ],
    cierre: [
      "El liderazgo consciente no es un discurso suave. Es una práctica exigente.",
      "Exige mirar la estrategia, la operación y la propia forma de dirigir. Exige reconocer que cada líder impacta la cultura con sus decisiones diarias.",
      "Cuando el líder crece, el equipo respira mejor, entiende mejor y actúa mejor.",
      "La organización crece cuando sus líderes desarrollan claridad interna y capacidad externa de acción.",
    ],
    cta: "Si tu liderazgo o tu equipo necesitan mayor claridad, sentido y compromiso, en Anima Praxis acompañamos procesos de liderazgo consciente para directivos y equipos de gestión. Agenda una sesión con Francisco Avilés y fortalece tu forma de dirigir.",
  },
  {
    slug: "coaching-ejecutivo-alto-compromiso",
    categoria: "Coaching Ejecutivo",
    titulo: "Coaching ejecutivo: desarrollo personal para equipos de alto compromiso",
    metaDescripcion:
      "El coaching ejecutivo fortalece conciencia, responsabilidad y desempeño en líderes y equipos bajo presión.",
    resumen:
      "El coaching fortalece conciencia, responsabilidad y desempeño en líderes que enfrentan presión y cambio.",
    fecha: "9 de abril de 2026",
    fechaCorta: "9 abril 2026",
    tiempoLectura: "6 min de lectura",
    autor: "Francisco Avilés",
    imagen: coachingImg,
    ctaTarjeta: "Agenda una sesión ejecutiva",
    introduccion: [
      "El coaching ejecutivo ayuda a líderes y profesionales a observar su forma de pensar, decidir, conversar y actuar. En organizaciones que buscan compromiso y colaboradores de alto nivel, el coaching funciona como una herramienta de desarrollo personal y profesional orientada a resultados.",
      "Las empresas suelen invertir en procesos, tecnología y estrategia. Aun así, muchas veces el problema central está en conversaciones que no ocurren, decisiones que se postergan, responsabilidades difusas y líderes que actúan desde la presión.",
      "El coaching ejecutivo trabaja en esa zona. No reemplaza la estrategia ni la capacitación. Las complementa.",
      "Un estudio de ICF citado en 2024 indica que 72% de los encuestados en el reporte ICF HCI 2023 reconoció una fuerte relación entre coaching y mayor compromiso de los empleados. Además, una revisión académica publicada en Frontiers in Psychology en 2023 concluyó que el coaching en el trabajo tiene efectos positivos en resultados organizacionales.",
      "El coaching no promete magia. Trabaja con conciencia, lenguaje, responsabilidad y acción.",
    ],
    ideas: [
      {
        titulo: "El coaching mejora la observación personal",
        texto:
          "Muchas personas no ven sus propios patrones. El líder cree que comunica claro, pero el equipo no entiende. Cree que delega, pero controla. Cree que escucha, pero interrumpe. El coaching ayuda a mirar esas brechas.",
      },
      {
        titulo: "El coaching fortalece responsabilidad",
        texto:
          "Responsabilidad no es culpa. Es capacidad de respuesta. El coaching ayuda al ejecutivo a dejar de explicar su situación únicamente desde factores externos y a identificar su margen de acción.",
      },
      {
        titulo: "El coaching mejora conversaciones",
        texto:
          "Gran parte del desempeño organizacional depende de pedidos, ofertas, acuerdos, retroalimentación y promesas. Cuando esas conversaciones fallan, falla la coordinación.",
      },
      {
        titulo: "El coaching acompaña transiciones",
        texto:
          "Ascensos, cambios de rol, crisis, conflictos, decisiones estratégicas y etapas de crecimiento exigen nuevas formas de actuar. El coaching ayuda a integrar esos cambios.",
      },
      {
        titulo: "El coaching conecta desarrollo personal con resultados",
        texto:
          "Un líder que mejora su escucha, su claridad y su gestión emocional impacta reuniones, decisiones, clima y desempeño.",
      },
    ],
    ejemploTitulo: "Ejemplo aplicado al mundo empresarial",
    ejemplo: [
      "Una directora de talento humano recibe quejas sobre un gerente técnico. El gerente es competente, pero su equipo lo percibe distante, rígido y poco abierto.",
      "En lugar de enviarlo a una capacitación genérica, la empresa propone un proceso de coaching ejecutivo.",
      "El trabajo se enfoca en tres objetivos: mejorar conversaciones de retroalimentación, delegar con mayor claridad y desarrollar presencia en reuniones de equipo.",
      "Durante el proceso, el gerente identifica una creencia: “Si no controlo cada detalle, el resultado saldrá mal”. Esa creencia lo lleva a revisar, corregir y limitar autonomía.",
      "A partir de ahí practica nuevos comportamientos. Define estándares claros, acuerda entregables y revisa avances sin invadir cada paso. El equipo gana confianza. El gerente mantiene exigencia, pero cambia su forma de coordinar.",
    ],
    errores: [
      {
        titulo: "Usar coaching como castigo",
        texto:
          "Cuando una persona recibe coaching porque “tiene un problema”, el proceso inicia con resistencia. El coaching debe presentarse como inversión en desarrollo.",
      },
      {
        titulo: "Esperar cambios sin práctica",
        texto:
          "La conciencia ayuda, pero el cambio exige acciones concretas, repetición y revisión.",
      },
      {
        titulo: "Confundir coaching con consejo",
        texto:
          "El coach no está para dirigir la vida del ejecutivo. Está para abrir observación, responsabilidad y nuevas acciones.",
      },
      {
        titulo: "Trabajar sin objetivos",
        texto: "Un proceso efectivo define metas, indicadores y contexto.",
      },
      {
        titulo: "Separar coaching de la organización",
        texto: "El desarrollo individual debe conversar con los desafíos de la empresa.",
      },
    ],
    recomendaciones: [
      "Identifica qué líderes necesitan crecer para sostener la estrategia.",
      "Define objetivos observables para cada proceso de coaching.",
      "Alinea coaching con desafíos reales, no con temas abstractos.",
      "Integra retroalimentación del contexto, cuidando confidencialidad y respeto.",
      "Mide avances en conversaciones, decisiones, delegación y coordinación.",
      "Promueve coaching como desarrollo, no como corrección.",
      "Acompaña al líder entre sesiones con prácticas concretas.",
    ],
    cierre: [
      "El coaching ejecutivo ayuda a que las personas se miren con mayor honestidad y actúen con mayor responsabilidad.",
      "Las organizaciones que invierten en coaching no trabajan únicamente sobre competencias. Trabajan sobre la calidad del liderazgo, la conversación y la acción.",
      "Cuando un líder cambia su forma de observar, cambia su forma de decidir. Cuando cambia su forma de decidir, cambia la experiencia del equipo.",
    ],
    cta: "Si quieres desarrollar líderes con mayor conciencia, responsabilidad y capacidad de acción, Anima Praxis diseña procesos de coaching ejecutivo conectados con los retos de tu organización. Agenda una conversación con Francisco Avilés y activa un proceso de desarrollo con dirección.",
  },
  {
    slug: "terapia-de-profundidad-integracion-personal",
    categoria: "Terapia de Profundidad",
    titulo: "Terapia de profundidad: integración personal para una vida más consciente",
    metaDescripcion:
      "La terapia de profundidad acompaña procesos de integración personal, conciencia y desarrollo humano.",
    resumen:
      "La profundidad acompaña procesos de cambio cuando la persona necesita integrar historia, patrones y decisiones.",
    fecha: "30 de abril de 2026",
    fechaCorta: "30 abril 2026",
    tiempoLectura: "6 min de lectura",
    autor: "Francisco Avilés",
    imagen: terapiaImg,
    ctaTarjeta: "Inicia un proceso profundo",
    introduccion: [
      "La terapia de profundidad acompaña a personas que desean mirar más allá de la conducta visible. Ayuda a reconocer patrones, integrar historia personal y construir una vida con mayor conciencia. En procesos de coaching, aporta una dimensión de integración que fortalece el desarrollo individual.",
      "Hay momentos en los que una persona sabe qué debe hacer, pero no logra sostenerlo. Entiende la meta, pero repite patrones. Recibe herramientas, pero vuelve a reaccionar igual. Quiere avanzar, pero algo interno la frena.",
      "En esos casos, el coaching aporta claridad y acción. La terapia de profundidad aporta integración.",
      "La American Psychological Association describe la psicoterapia como un tratamiento colaborativo basado en la relación y el diálogo entre persona y profesional.",
      "La terapia de profundidad, desde enfoques psicodinámicos y de desarrollo interior, trabaja con capas más hondas de la experiencia humana: historia, símbolos, heridas, defensas, deseos, miedos, sentido y patrones relacionales. No se trata de mirar el pasado por curiosidad. Se trata de comprender cómo el pasado sigue participando en el presente.",
    ],
    ideas: [
      {
        titulo: "La profundidad ayuda a reconocer patrones",
        texto:
          "Una persona que cambia de trabajo, pareja o proyecto, pero repite la misma forma de sufrir, necesita mirar el patrón. La profundidad ayuda a identificar esas repeticiones.",
      },
      {
        titulo: "La integración reduce fragmentación interna",
        texto:
          "Muchas personas viven divididas entre lo que muestran y lo que sienten. Entre lo que logran y lo que evitan. Entre la imagen profesional y la vida interna. Integrar significa escuchar partes propias que quedaron excluidas.",
      },
      {
        titulo: "La profundidad fortalece decisiones adultas",
        texto:
          "Una decisión adulta no nace únicamente del impulso, la aprobación externa o el miedo. Nace de mayor conciencia sobre motivaciones, límites y consecuencias.",
      },
      {
        titulo: "La terapia de profundidad acompaña procesos de coaching",
        texto:
          "El coaching pregunta: ¿qué quieres construir y qué acción tomarás? La profundidad añade: ¿desde qué historia decides, qué patrón se repite y qué parte de ti necesita integración?",
      },
      {
        titulo: "La profundidad conecta desarrollo personal con vida funcional",
        texto:
          "Una persona más integrada responde mejor, se relaciona mejor y sostiene mejor su proyecto de vida. La evidencia sobre psicoterapia psicodinámica ha mostrado eficacia en distintos contextos clínicos, y estudios revisados por APA han señalado que sus efectos son comparables a los de otras terapias reconocidas.",
      },
    ],
    ejemploTitulo: "Ejemplo aplicado al mundo profesional",
    ejemplo: [
      "Un ejecutivo exitoso busca coaching porque quiere mejorar su liderazgo. Tiene metas claras, inteligencia, experiencia y capacidad de trabajo. Aun así, sus relaciones laborales se deterioran.",
      "Durante el proceso, aparece un patrón: interpreta desacuerdos como ataques personales. Responde con dureza, se protege y luego se arrepiente.",
      "El coaching trabaja conversaciones, escucha y gestión de reuniones. La profundidad permite mirar el origen de esa reacción. El ejecutivo reconoce experiencias tempranas donde debía defenderse para no sentirse humillado.",
      "Ese reconocimiento no lo deja anclado al pasado. Le da libertad. Empieza a distinguir el desacuerdo actual de la amenaza antigua.",
      "Con mayor integración, cambia su presencia. Sigue siendo exigente, pero ya no necesita defenderse en cada conversación.",
    ],
    errores: [
      {
        titulo: "Creer que la profundidad es debilidad",
        texto: "Mirarse con honestidad requiere fuerza. Evitarse consume más energía.",
      },
      {
        titulo: "Buscar resultados inmediatos en temas de larga historia",
        texto: "Algunos patrones requieren tiempo, práctica y acompañamiento.",
      },
      {
        titulo: "Usar conceptos psicológicos para etiquetar a otros",
        texto:
          "La profundidad empieza por la propia responsabilidad, no por diagnosticar al entorno.",
      },
      {
        titulo: "Confundir integración con perfección",
        texto:
          "Integrar no significa no sentir miedo, rabia o tristeza. Significa relacionarse con esas experiencias de forma más consciente.",
      },
      {
        titulo: "Separar vida personal y vida profesional",
        texto:
          "La persona que lidera, decide y trabaja es la misma que siente, recuerda y se protege.",
      },
    ],
    recomendaciones: [
      "Observa qué situaciones activan respuestas intensas en ti.",
      "Registra patrones que se repiten en trabajo, pareja, familia o decisiones.",
      "Pregunta qué emoción aparece antes de reaccionar.",
      "Distingue hechos actuales de historias antiguas.",
      "Busca acompañamiento cuando notes que una conducta se repite a pesar de tu intención de cambiar.",
      "Integra cuerpo, emoción, lenguaje y acción.",
      "No uses la productividad como escape de tu vida interna.",
    ],
    cierre: [
      "El desarrollo humano profundo no consiste en mejorar una imagen. Consiste en construir una relación más honesta contigo mismo.",
      "Cuando una persona se integra, gana libertad para elegir mejor. Deja de repetir sin darse cuenta. Empieza a responder desde mayor conciencia.",
      "La organización también se beneficia. Personas más conscientes generan conversaciones más maduras, vínculos más sanos y decisiones más responsables.",
    ],
    cta: "Si buscas un proceso que una claridad, acción e integración personal, Anima Praxis acompaña caminos de coaching y profundidad con respeto, criterio y orientación al desarrollo. Agenda una conversación con Francisco Avilés y da un paso hacia una vida más consciente.",
  },
  {
    slug: "capacitacion-corporativa-personalizada",
    categoria: "Capacitación Corporativa",
    titulo: "Capacitación corporativa personalizada: aprendizaje conectado con la operación real",
    metaDescripcion:
      "La capacitación personalizada adapta contenidos, casos y recursos a la cultura y necesidades reales de cada empresa.",
    resumen:
      "La capacitación genera impacto cuando responde a la cultura, procesos y desafíos concretos de la empresa.",
    fecha: "22 de mayo de 2026",
    fechaCorta: "22 mayo 2026",
    tiempoLectura: "6 min de lectura",
    autor: "Francisco Avilés",
    imagen: capacitacionImg,
    ctaTarjeta: "Diseñemos tu capacitación",
    introduccion: [
      "La capacitación corporativa ya no debe limitarse a contenidos estándar. Los desarrollos actuales de IA, los cambios en habilidades y la presión por productividad exigen programas diseñados a la medida de cada organización. La personalización conecta aprendizaje, operación y resultados.",
      "Durante años, muchas empresas capacitaron con programas genéricos. Un mismo taller para distintos equipos. Un mismo contenido para distintas culturas. Una misma dinámica para retos diferentes. Hoy ese enfoque pierde fuerza.",
      "La velocidad tecnológica, la adopción de IA y la transformación de roles exigen capacitación conectada con la realidad de cada organización.",
      "El World Economic Forum indicó en su Future of Jobs Report 2025 que habilidades en IA, big data y ciberseguridad crecerán en demanda, mientras habilidades humanas como pensamiento creativo, resiliencia, flexibilidad y agilidad seguirán siendo críticas.",
      "La pregunta ya no es “qué curso damos”. La pregunta es “qué capacidades necesita nuestra gente para ejecutar mejor la estrategia”.",
    ],
    ideas: [
      {
        titulo: "La capacitación debe partir de diagnóstico",
        texto:
          "Antes de diseñar un programa, hay que entender el negocio, la cultura, el nivel de madurez, los procesos, los problemas reales y las brechas de desempeño.",
      },
      {
        titulo: "La personalización mejora transferencia",
        texto:
          "Las personas aprenden mejor cuando reconocen su contexto en los ejercicios. Casos reales, conversaciones reales y decisiones reales aumentan relevancia.",
      },
      {
        titulo: "La IA exige nuevas formas de aprender",
        texto:
          "No basta enseñar herramientas. Hay que enseñar criterio, formulación de preguntas, revisión de resultados, ética, seguridad de datos y aplicación en procesos concretos.",
      },
      {
        titulo: "La capacitación debe incluir recursos de aplicación",
        texto:
          "Un taller aislado inspira por un día y desaparece. Una capacitación bien diseñada entrega guías, plantillas, prácticas, checklists y seguimiento.",
      },
      {
        titulo: "Talento humano y líderes deben medir impacto",
        texto:
          "LinkedIn Learning reportó en su Workplace Learning Report 2025 que los equipos de aprendizaje y desarrollo están enfocados en crecimiento profesional, adaptabilidad y desarrollo de habilidades. La formación ya no es actividad de soporte. Es una decisión estratégica.",
      },
    ],
    ejemploTitulo: "Ejemplo aplicado al mundo empresarial",
    ejemplo: [
      "Una empresa logística solicita una capacitación en negociación. La opción genérica sería dictar teoría, presentar técnicas y hacer ejercicios estándar.",
      "Un diseño personalizado sigue otra ruta. Primero se entrevista a líderes comerciales, operaciones y servicio al cliente. Luego se identifican conflictos frecuentes: tarifas, tiempos de entrega, reclamos, negociación con proveedores y presión por descuentos.",
      "Con esa información, el programa se diseña con casos reales de la empresa. Los participantes practican conversaciones con clientes exigentes, construyen argumentos de valor, aprenden a manejar objeciones y trabajan acuerdos internos entre áreas.",
      "Después del taller reciben guías de conversación, matriz de preparación y formato de seguimiento.",
      "El aprendizaje sale del aula y entra en la operación.",
    ],
    errores: [
      {
        titulo: "Comprar capacitación por tema, no por necesidad",
        texto:
          "“Queremos liderazgo” no basta. Hay que precisar qué conducta de liderazgo necesita cambiar.",
      },
      {
        titulo: "Medir éxito por asistencia",
        texto: "La asistencia no demuestra aprendizaje ni cambio.",
      },
      {
        titulo: "Usar ejemplos lejanos al negocio",
        texto: "Los participantes desconectan cuando el caso no se parece a su realidad.",
      },
      {
        titulo: "No involucrar a líderes",
        texto: "Si los jefes no sostienen el aprendizaje, el taller queda aislado.",
      },
      {
        titulo: "Ignorar la cultura",
        texto:
          "Una empresa jerárquica, una empresa comercial y una empresa técnica requieren diseños distintos.",
      },
      {
        titulo: "Capacitar en IA sin reglas de uso",
        texto:
          "La IA mal incorporada genera errores, dependencia y riesgos de información.",
      },
    ],
    recomendaciones: [
      "Define la necesidad de negocio antes del tema de capacitación.",
      "Realiza entrevistas breves con líderes y participantes.",
      "Identifica situaciones reales que se repiten en la operación.",
      "Diseña talleres con práctica, no únicamente teoría.",
      "Incluye recursos descargables y herramientas de aplicación.",
      "Acompaña la transferencia con seguimiento posterior.",
      "Mide cambios en conducta, calidad, tiempos, ventas, servicio o coordinación.",
      "Actualiza contenidos de IA cada ciclo. La tecnología cambia rápido.",
    ],
    cierre: [
      "La capacitación corporativa efectiva no llena agendas. Desarrolla capacidades.",
      "Cuando una organización personaliza su formación, respeta su propia realidad. Reconoce que sus equipos no necesitan información general, necesitan herramientas aplicables a sus desafíos.",
      "La IA aumenta esa exigencia. Las empresas necesitan aprender más rápido, pero también con mayor criterio.",
      "Capacitar mejor no significa capacitar más. Significa diseñar mejor, aplicar mejor y acompañar mejor.",
    ],
    cta: "Si tu organización necesita capacitaciones personalizadas, prácticas y conectadas con casos reales, Anima Praxis diseña programas a la medida de tu cultura, operación y estrategia. Agenda una conversación con Francisco Avilés y convierte la formación en resultados visibles.",
  },
];

export const getArticleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

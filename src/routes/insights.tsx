import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Anima Praxis" },
      { name: "description", content: "Ideas sobre estrategia, inteligencia artificial aplicada, liderazgo, coaching, terapia de profundidad y capacitación corporativa." },
      { property: "og:title", content: "Insights — Anima Praxis" },
      { property: "og:description", content: "Reflexiones sobre estrategia, IA y desarrollo humano." },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: Page,
});

const WA_URL =
  "https://wa.me/593984220189?text=Hola%20Anima%20Praxis%2C%20me%20interesa%20conversar%20sobre%20uno%20de%20sus%20insights.";

const articulos = [
  {
    categoria: "Estrategia",
    titulo: "Estrategia en tiempos de cambio: decidir mejor antes de actuar más",
    resumen:
      "La estrategia ayuda a ordenar decisiones, foco y recursos cuando el entorno cambia rápido.",
    fecha: "15 enero 2026",
    cta: "Define tu ruta estratégica",
  },
  {
    categoria: "Inteligencia Artificial Aplicada",
    titulo: "IA aplicada con estrategia: productividad con dirección, no con improvisación",
    resumen:
      "La IA genera valor cuando responde a prioridades claras, procesos reales y métricas de negocio.",
    fecha: "6 febrero 2026",
    cta: "Conversemos sobre IA aplicada",
  },
  {
    categoria: "Liderazgo",
    titulo: "Liderazgo consciente: claridad, sentido y desarrollo personal para dirigir mejor",
    resumen:
      "Liderar hoy exige presencia, criterio, coherencia y capacidad de sostener conversaciones que movilicen.",
    fecha: "12 marzo 2026",
    cta: "Fortalece tu liderazgo",
  },
  {
    categoria: "Coaching Ejecutivo",
    titulo: "Coaching ejecutivo: desarrollo personal para equipos de alto compromiso",
    resumen:
      "El coaching fortalece conciencia, responsabilidad y desempeño en líderes que enfrentan presión y cambio.",
    fecha: "9 abril 2026",
    cta: "Agenda una sesión ejecutiva",
  },
  {
    categoria: "Terapia de Profundidad",
    titulo: "Terapia de profundidad: integración personal para una vida más consciente",
    resumen:
      "La profundidad acompaña procesos de cambio cuando la persona necesita integrar historia, patrones y decisiones.",
    fecha: "30 abril 2026",
    cta: "Inicia un proceso profundo",
  },
  {
    categoria: "Capacitación Corporativa",
    titulo: "Capacitación corporativa personalizada: aprendizaje conectado con la operación real",
    resumen:
      "La capacitación genera impacto cuando responde a la cultura, procesos y desafíos concretos de la empresa.",
    fecha: "22 mayo 2026",
    cta: "Diseñemos tu capacitación",
  },
];

function Page() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">
            Ideas para estrategia, inteligencia artificial y desarrollo humano
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Reflexiones breves desde Anima Praxis para líderes, equipos y personas que
            buscan decidir mejor y crecer con sentido.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articulos.map((a) => (
            <article
              key={a.titulo}
              className="rounded-2xl border border-border p-6 bg-cream/40 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-hover">
                {a.categoria}
              </span>
              <h2 className="font-display text-xl text-deep leading-snug">{a.titulo}</h2>
              <p className="text-sm text-muted-foreground">{a.resumen}</p>
              <p className="text-xs text-muted-foreground">{a.fecha}</p>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                {a.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

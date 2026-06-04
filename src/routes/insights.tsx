import { createFileRoute } from "@tanstack/react-router";
import { Falta } from "@/components/brand/Falta";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Anima Praxis" },
      { name: "description", content: "Ideas sobre estrategia, inteligencia artificial aplicada, liderazgo, coaching y capacitación corporativa." },
      { property: "og:title", content: "Insights — Anima Praxis" },
      { property: "og:description", content: "Reflexiones sobre estrategia, IA y desarrollo humano." },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: Page,
});

const categorias = [
  "Estrategia",
  "Inteligencia artificial aplicada",
  "Liderazgo",
  "Coaching",
  "Terapia de profundidad",
  "Capacitación corporativa",
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
            Próximamente publicaremos artículos propios. Mientras tanto, estos son los temas que
            iremos desarrollando.
          </p>
        </header>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categorias.map((cat) => (
            <article key={cat} className="rounded-2xl border border-border p-6 bg-cream/40 flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-hover">{cat}</span>
              <h2 className="font-display text-xl text-deep">
                <Falta label="título" />
              </h2>
              <p className="text-sm text-muted-foreground">
                <Falta label="resumen" />
              </p>
              <p className="text-xs text-muted-foreground mt-auto">
                <Falta label="fecha" />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

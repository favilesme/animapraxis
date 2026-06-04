import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — Anima Praxis" },
      {
        name: "description",
        content:
          "Artículos sobre estrategia, inteligencia artificial aplicada, liderazgo, coaching, terapia de profundidad y capacitación corporativa.",
      },
      { property: "og:title", content: "Insights — Anima Praxis" },
      { property: "og:description", content: "Reflexiones sobre estrategia, IA y desarrollo humano." },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">
            Ideas para estrategia, inteligencia artificial y desarrollo humano
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Reflexiones desde Anima Praxis para líderes, equipos y personas que buscan
            decidir mejor y crecer con sentido.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="group rounded-2xl border border-border bg-cream/40 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              <Link
                to="/insights/$slug"
                params={{ slug: a.slug }}
                className="block aspect-video overflow-hidden bg-deep/10"
              >
                <img
                  src={a.imagen}
                  alt={a.titulo}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary-hover">
                  {a.categoria}
                </span>
                <h2 className="font-display text-xl text-deep leading-snug">
                  <Link
                    to="/insights/$slug"
                    params={{ slug: a.slug }}
                    className="hover:text-primary-hover transition-colors"
                  >
                    {a.titulo}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground">{a.resumen}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2">
                  <span>{a.fechaCorta}</span>
                  <span>{a.tiempoLectura}</span>
                </div>
                <Link
                  to="/insights/$slug"
                  params={{ slug: a.slug }}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary-hover transition-colors"
                >
                  Leer artículo
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

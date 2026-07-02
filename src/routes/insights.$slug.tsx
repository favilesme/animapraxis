import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles, getArticleBySlug, type Article } from "@/data/articles";
import { WHATSAPP_URL } from "@/lib/contact";

const WA_URL =
  `${WHATSAPP_URL}?text=Hola%20Anima%20Praxis%2C%20me%20interesa%20conversar%20a%20partir%20de%20uno%20de%20sus%20insights.`;

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.article;
    if (!a) {
      return {
        meta: [{ title: "Artículo — Anima Praxis" }],
      };
    }
    return {
      meta: [
        { title: `${a.titulo} — Anima Praxis` },
        { name: "description", content: a.metaDescripcion },
        { property: "og:title", content: a.titulo },
        { property: "og:description", content: a.metaDescripcion },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/insights/${params.slug}` },
        { property: "og:image", content: a.imagen },
        { property: "article:author", content: a.autor },
        { property: "article:section", content: a.categoria },
      ],
      links: [{ rel: "canonical", href: `/insights/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.titulo,
            description: a.metaDescripcion,
            author: { "@type": "Person", name: a.autor },
            datePublished: a.fecha,
            image: a.imagen,
            articleSection: a.categoria,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="font-display text-3xl text-deep">Artículo no encontrado</h1>
        <p className="mt-3 text-muted-foreground">
          El artículo que buscas no existe o fue movido.
        </p>
        <Link
          to="/insights"
          className="mt-6 inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          Volver a Insights
        </Link>
      </div>
    </section>
  ),
  errorComponent: ({ error, reset }) => (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="font-display text-3xl text-deep">Ocurrió un problema</h1>
        <p className="mt-3 text-muted-foreground">No pudimos cargar este artículo. Por favor, intenta de nuevo.</p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          Reintentar
        </button>
      </div>
    </section>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article: a } = Route.useLoaderData() as { article: Article };
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <article className="pb-20">
      <header className="bg-cream/40 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/insights" className="hover:text-primary-hover">
              ← Volver a Insights
            </Link>
          </nav>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-hover">
            {a.categoria}
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-deep leading-tight">
            {a.titulo}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{a.resumen}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="font-semibold text-deep">{a.autor}</span>
            <span>·</span>
            <span>{a.fecha}</span>
            <span>·</span>
            <span>{a.tiempoLectura}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <img
          src={a.imagen}
          alt={a.titulo}
          width={1280}
          height={720}
          className="w-full aspect-video object-cover rounded-2xl -mt-6 sm:-mt-10 shadow-lg"
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <section className="space-y-5 text-foreground leading-relaxed">
          {a.introduccion.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <section>
          <h2 className="font-display text-2xl sm:text-3xl text-deep mb-6">
            Ideas centrales
          </h2>
          <div className="space-y-6">
            {a.ideas.map((idea, i) => (
              <div key={i} className="border-l-4 border-primary pl-5">
                <h3 className="font-display text-xl text-deep">{idea.titulo}</h3>
                <p className="mt-2 text-foreground leading-relaxed">{idea.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl sm:text-3xl text-deep mb-6">
            {a.ejemploTitulo}
          </h2>
          <div className="space-y-5 text-foreground leading-relaxed">
            {a.ejemplo.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl sm:text-3xl text-deep mb-6">
            Errores comunes que deben evitarse
          </h2>
          <ul className="space-y-4">
            {a.errores.map((e, i) => (
              <li key={i} className="rounded-xl bg-cream/40 border border-border p-5">
                <h3 className="font-semibold text-deep">{e.titulo}</h3>
                <p className="mt-1.5 text-foreground leading-relaxed">{e.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl sm:text-3xl text-deep mb-6">
            Recomendaciones prácticas
          </h2>
          <ul className="space-y-3">
            {a.recomendaciones.map((r, i) => (
              <li key={i} className="flex gap-3 text-foreground leading-relaxed">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-hover flex-shrink-0"
                />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5 text-foreground leading-relaxed">
          <h2 className="font-display text-2xl sm:text-3xl text-deep">Cierre</h2>
          {a.cierre.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <section className="rounded-2xl bg-deep p-8 sm:p-10 text-center">
          <div className="text-white">
            <h2 className="font-display text-2xl sm:text-3xl">Da el siguiente paso</h2>
            <p className="mt-3 text-white/90 leading-relaxed max-w-2xl mx-auto">{a.cta}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                Conversar por WhatsApp
              </a>
              <Link
                to="/contacto"
                className="inline-flex items-center rounded-full border border-white/40 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Ir a contacto
              </Link>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="font-display text-2xl sm:text-3xl text-deep mb-6">
              Otros insights
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/insights/$slug"
                  params={{ slug: r.slug }}
                  className="group block rounded-xl border border-border bg-cream/40 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video overflow-hidden bg-deep/10">
                    <img
                      src={r.imagen}
                      alt={r.titulo}
                      loading="lazy"
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-hover">
                      {r.categoria}
                    </span>
                    <h3 className="mt-1 font-display text-base text-deep leading-snug">
                      {r.titulo}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, getArticlesByCategory } from "@/data/insightsData";
import { ArticleCard } from "@/components/insights/ArticleCard";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — Anima Praxis" },
      {
        name: "description",
        content:
          "Artículos sobre estrategia, coaching, liderazgo e inteligencia artificial aplicada para líderes y organizaciones.",
      },
      { property: "og:title", content: "Insights — Anima Praxis" },
      {
        property: "og:description",
        content:
          "Reflexiones sobre estrategia, coaching, liderazgo e IA aplicada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
            Ideas para estrategia, coaching, liderazgo e inteligencia artificial
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Reflexiones desde Anima Praxis para líderes, equipos y personas que
            buscan decidir mejor y crecer con sentido.
          </p>
        </header>

        <div className="mt-16 space-y-16">
          {categories.map((category) => {
            const list = getArticlesByCategory(category);
            if (list.length === 0) return null;
            return (
              <section key={category.slug}>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <h2 className="font-display text-3xl text-deep">
                      {category.nombre}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.descripcion}
                    </p>
                  </div>
                  <Link
                    to={category.path}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-hover transition-colors duration-300 hover:text-deep"
                  >
                    Ver todos los artículos de {category.nombre}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {list.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

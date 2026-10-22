import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Compass, Megaphone, Cpu, type LucideIcon } from "lucide-react";
import {
  categories,
  getArticlesByCategory,
  type CategorySlug,
} from "@/data/insightsData";
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

const categoryIcons: Record<CategorySlug, LucideIcon> = {
  estrategia: Target,
  coaching: Compass,
  liderazgo: Megaphone,
  "ia-aplicada": Cpu,
};

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

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {categories.map((category) => {
            const list = getArticlesByCategory(category);
            if (list.length === 0) return null;
            const Icon = categoryIcons[category.slug];
            return (
              <section
                key={category.slug}
                className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden"
              >
                <h2 className="p-5 pb-4 text-center font-display text-lg uppercase tracking-widest text-deep border-b border-border">
                  {category.nombre}
                </h2>
                <div className="flex-1 space-y-4 p-4">
                  {list.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
                <Link
                  to={category.path}
                  className="mt-auto flex items-center gap-3 border-t border-border px-4 py-4 text-sm font-semibold text-primary-hover underline underline-offset-4 transition-colors duration-300 hover:text-deep"
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                  <span className="min-w-0">
                    Ver todos los artículos de {category.nombre}
                  </span>
                </Link>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

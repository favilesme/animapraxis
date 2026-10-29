import { defaultSocialMeta } from "@/lib/social-metadata";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategoryBySlug } from "@/data/insightsData";
import { CategoryPage } from "@/components/insights/CategoryPage";

const category = getCategoryBySlug("ia-aplicada");

export const Route = createFileRoute("/insights/ia-aplicada")({
  loader: () => {
    if (!category) throw notFound();
    return { category };
  },
  head: () => ({
    meta: [
      ...defaultSocialMeta(),
      { title: "Insights de IA Aplicada — Anima Praxis" },
      {
        name: "description",
        content:
          "Artículos sobre inteligencia artificial al servicio de la productividad y la estrategia.",
      },
      { property: "og:title", content: "Insights de IA Aplicada — Anima Praxis" },
      {
        property: "og:description",
        content:
          "Inteligencia artificial al servicio de la productividad y la estrategia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/insights/ia-aplicada" }],
  }),
  component: Page,
});

function Page() {
  const { category } = Route.useLoaderData();
  return <CategoryPage category={category} />;
}

import { defaultSocialMeta } from "@/lib/social-metadata";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategoryBySlug } from "@/data/insightsData";
import { CategoryPage } from "@/components/insights/CategoryPage";

const category = getCategoryBySlug("estrategia");

export const Route = createFileRoute("/insights/estrategia")({
  loader: () => {
    if (!category) throw notFound();
    return { category };
  },
  head: () => ({
    meta: [
      ...defaultSocialMeta(),
      { title: "Insights de Estrategia — Anima Praxis" },
      {
        name: "description",
        content:
          "Artículos sobre claridad estratégica, prioridades y mejores decisiones para tu negocio.",
      },
      { property: "og:title", content: "Insights de Estrategia — Anima Praxis" },
      {
        property: "og:description",
        content:
          "Claridad estratégica, prioridades y mejores decisiones para tu negocio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/insights/estrategia" }],
  }),
  component: Page,
});

function Page() {
  const { category } = Route.useLoaderData();
  return <CategoryPage category={category} />;
}

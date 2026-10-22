import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategoryBySlug } from "@/data/insightsData";
import { CategoryPage } from "@/components/insights/CategoryPage";

const category = getCategoryBySlug("coaching");

export const Route = createFileRoute("/insights/coaching")({
  loader: () => {
    if (!category) throw notFound();
    return { category };
  },
  head: () => ({
    meta: [
      { title: "Insights de Coaching — Anima Praxis" },
      {
        name: "description",
        content:
          "Artículos sobre coaching ontológico y ejecutivo para líderes que buscan evolucionar.",
      },
      { property: "og:title", content: "Insights de Coaching — Anima Praxis" },
      {
        property: "og:description",
        content:
          "Coaching ontológico y ejecutivo para líderes que buscan evolucionar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/insights/coaching" }],
  }),
  component: Page,
});

function Page() {
  const { category } = Route.useLoaderData();
  return <CategoryPage category={category} />;
}

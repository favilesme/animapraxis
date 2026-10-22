import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategoryBySlug } from "@/data/insightsData";
import { CategoryPage } from "@/components/insights/CategoryPage";

const category = getCategoryBySlug("liderazgo");

export const Route = createFileRoute("/insights/liderazgo")({
  loader: () => {
    if (!category) throw notFound();
    return { category };
  },
  head: () => ({
    meta: [
      { title: "Insights de Liderazgo — Anima Praxis" },
      {
        name: "description",
        content:
          "Artículos sobre liderazgo consciente y organizacional aplicado a la operación diaria.",
      },
      { property: "og:title", content: "Insights de Liderazgo — Anima Praxis" },
      {
        property: "og:description",
        content:
          "Liderazgo consciente y organizacional aplicado a la operación diaria.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/insights/liderazgo" }],
  }),
  component: Page,
});

function Page() {
  const { category } = Route.useLoaderData();
  return <CategoryPage category={category} />;
}

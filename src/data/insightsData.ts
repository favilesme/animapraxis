import { articles, type Article } from "@/data/articles";

/**
 * Categorías principales de Insights.
 * Fuente única de verdad para la clasificación de artículos en 4 dimensiones.
 * Reutiliza los artículos reales de src/data/articles.ts (sin datos de prueba).
 */

export type CategorySlug = "estrategia" | "coaching" | "liderazgo" | "ia-aplicada";

export type Category = {
  slug: CategorySlug;
  /** Ruta de la categoría, ej. /insights/estrategia */
  path: `/insights/${CategorySlug}`;
  nombre: string;
  descripcion: string;
  /** Valores de `Article.categoria` que pertenecen a esta categoría */
  match: string[];
};

export const categories: Category[] = [
  {
    slug: "estrategia",
    path: "/insights/estrategia",
    nombre: "Estrategia",
    descripcion:
      "Claridad estratégica, prioridades y mejores decisiones para tu negocio.",
    match: ["Estrategia"],
  },
  {
    slug: "coaching",
    path: "/insights/coaching",
    nombre: "Coaching",
    descripcion:
      "Coaching ontológico y ejecutivo para líderes que buscan evolucionar.",
    match: ["Coaching Ejecutivo", "Coaching Ontológico"],
  },
  {
    slug: "liderazgo",
    path: "/insights/liderazgo",
    nombre: "Liderazgo",
    descripcion:
      "Liderazgo consciente y organizacional aplicado a la operación diaria.",
    match: ["Liderazgo", "Formación Corporativa"],
  },
  {
    slug: "ia-aplicada",
    path: "/insights/ia-aplicada",
    nombre: "IA Aplicada",
    descripcion:
      "Inteligencia artificial al servicio de la productividad y la estrategia.",
    match: ["Inteligencia Artificial Aplicada"],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return articles.filter((a) => category.match.includes(a.categoria));
}

export type { Article };

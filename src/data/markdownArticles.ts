import strategicContent from "@/content/insights/articulo-001.md?raw";
import automationContent from "@/content/insights/articulo-002.md?raw";
import strategicImage from "@/assets/insights/articulo-001-ia-planificacion-estrategica.png.asset.json";
import automationImage from "@/assets/insights/articulo-002-automatizacion-ia-pymes.png.asset.json";
import strategicSocial from "@/assets/insights/articulo-001-ia-planificacion-estrategica-social.jpg.asset.json";
import automationSocial from "@/assets/insights/articulo-002-automatizacion-ia-pymes-social.jpg.asset.json";

const origin = "https://animapraxis.org";
const editorial = {
  format: "markdown" as const,
  autor: "Francisco Avilés",
  fecha: "29 de octubre de 2026",
  fechaCorta: "29 octubre 2026",
  publishedAt: "2026-10-29T00:00:00-05:00",
  modifiedAt: "2026-10-29T00:00:00-05:00",
};

export const markdownArticles = [
  {
    ...editorial,
    slug: "ia-planificacion-estrategica-decisiones-verificables",
    categoria: "Estrategia",
    titulo: "IA en la planificación estratégica: de señales a decisiones verificables",
    seoTitle: "IA en la planificación estratégica: decisiones verificables | Anima Praxis",
    metaDescripcion: "Aprende a usar IA para investigar, comparar escenarios y dar seguimiento a una estrategia con fuentes verificables y decisión humana.",
    imagen: `${origin}${strategicImage.url}`,
    socialImage: `${origin}${strategicSocial.url}`,
    imageAlt: "Tarjetas de información que convergen en una ruta de decisiones estratégicas señalada en dorado",
    content: strategicContent,
  },
  {
    ...editorial,
    slug: "automatizacion-ia-pymes-priorizar-medir-piloto",
    categoria: "Inteligencia Artificial Aplicada",
    titulo: "Automatización con IA para pymes: qué proceso elegir y cómo medir el piloto",
    seoTitle: "Automatización con IA para pymes: priorizar y medir | Anima Praxis",
    metaDescripcion: "Identifica qué proceso automatizar primero, estima costos completos y mide un piloto de IA para decidir si conviene escalar.",
    imagen: `${origin}${automationImage.url}`,
    socialImage: `${origin}${automationSocial.url}`,
    imageAlt: "Flujos de procesos empresariales; uno destaca en dorado y conduce a indicadores de tiempo, calidad y costo",
    content: automationContent,
  },
];

export type MarkdownArticle = (typeof markdownArticles)[number];
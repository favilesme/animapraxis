import { Link } from "@tanstack/react-router";
import type { Article } from "@/data/articles";

/**
 * Tarjeta minimalista de artículo: solo miniatura (aspect-video, zoom sutil
 * en hover) y título. Toda la tarjeta es cliqueable hacia el artículo.
 */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: article.slug }}
      className="group block rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="aspect-video overflow-hidden bg-deep/10">
        <img
          src={article.imagen}
          alt={"imageAlt" in article ? article.imageAlt : article.titulo}
          loading="lazy"
          width={1280}
          height={720}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-deep leading-snug transition-colors duration-300 group-hover:text-primary-hover">
          {article.titulo}
        </h3>
      </div>
    </Link>
  );
}

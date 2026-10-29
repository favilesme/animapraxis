type EditorialArticle = {
  slug: string; titulo: string; seoTitle: string; metaDescripcion: string;
  imagen: string; socialImage: string; autor: string; categoria: string; publishedAt: string; modifiedAt: string;
};

export function markdownArticleHead(article: EditorialArticle) {
  const url = `https://animapraxis.org/insights/${article.slug}`;
  return {
    meta: [
      { title: article.seoTitle },
      { name: "description", content: article.metaDescripcion },
      { property: "og:title", content: article.seoTitle },
      { property: "og:description", content: article.metaDescripcion },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: article.socialImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: article.seoTitle },
      { name: "twitter:description", content: article.metaDescripcion },
      { name: "twitter:image", content: article.socialImage },
      { property: "article:published_time", content: article.publishedAt },
      { property: "article:modified_time", content: article.modifiedAt },
      { property: "article:author", content: article.autor },
      { property: "article:section", content: article.categoria },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "BlogPosting",
        "@id": `${url}#article`, url, mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: article.titulo, description: article.metaDescripcion, image: article.imagen,
        datePublished: article.publishedAt, dateModified: article.modifiedAt,
        author: { "@type": "Person", name: article.autor, url: "https://animapraxis.org/sobre-francisco" },
        publisher: { "@type": "Organization", name: "Anima Praxis", url: "https://animapraxis.org" },
        articleSection: article.categoria, inLanguage: "es-EC",
      }),
    }],
  };
}
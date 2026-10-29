import { describe, expect, test } from "bun:test";
import { markdownArticleHead } from "./article-metadata";

describe("Approved October editorial dates and URLs", () => {
  for (const slug of ["ia-planificacion-estrategica-decisiones-verificables", "automatizacion-ia-pymes-priorizar-medir-piloto"]) {
    const article = { slug, titulo: "Editorial", seoTitle: "Editorial | Anima Praxis", metaDescripcion: "Editorial", imagen: "https://animapraxis.org/original.png", socialImage: "https://animapraxis.org/social.jpg", autor: "Francisco Avilés", categoria: "Estrategia", publishedAt: "2026-10-29T00:00:00-05:00", modifiedAt: "2026-10-29T00:00:00-05:00" };
    test(`${slug}: canonical self-references the exact public slug`, () => {
      expect(markdownArticleHead(article).links).toEqual([{ rel: "canonical", href: `https://animapraxis.org/insights/${slug}` }]);
    });
    test(`${slug}: BlogPosting dates use October 29 in Ecuador`, () => {
      const data = JSON.parse(markdownArticleHead(article).scripts[0].children);
      expect(data.datePublished).toBe("2026-10-29T00:00:00-05:00");
      expect(data.dateModified).toBe("2026-10-29T00:00:00-05:00");
      expect(data.author.name).toBe("Francisco Avilés");
    });
  }
});
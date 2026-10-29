import { describe, it as test } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { markdownArticleHead } from "./article-metadata";

describe("Approved October editorial dates and URLs", () => {
  for (const slug of ["ia-planificacion-estrategica-decisiones-verificables", "automatizacion-ia-pymes-priorizar-medir-piloto"]) {
    const article = { slug, titulo: "Editorial", seoTitle: "Editorial | Anima Praxis", metaDescripcion: "Editorial", imagen: "https://animapraxis.org/original.png", socialImage: "https://animapraxis.org/social.jpg", autor: "Francisco Avilés", categoria: "Estrategia", publishedAt: "2026-10-29", modifiedAt: "2026-10-29" };
    test(`${slug}: canonical self-references the exact public slug`, () => {
      deepStrictEqual(markdownArticleHead(article).links, [{ rel: "canonical", href: `https://animapraxis.org/insights/${slug}` }]);
    });
    test(`${slug}: BlogPosting dates use October 29 in Ecuador`, () => {
      const data = JSON.parse(markdownArticleHead(article).scripts[0].children);
      strictEqual(data.datePublished, "2026-10-29");
      strictEqual(data.dateModified, "2026-10-29");
      strictEqual(data.author.name, "Francisco Avilés");
    });
    test(`${slug}: omit unknown publication and modification times`, () => {
      const meta = markdownArticleHead(article).meta;
      strictEqual(meta.some((tag) => tag.property === "article:published_time" || tag.property === "article:modified_time"), false);
    });
  }
});
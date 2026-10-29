import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@tanstack/react-router";
import type { MarkdownArticle } from "@/data/markdownArticles";
import { articles } from "@/data/articles";
import { ArticleCard } from "@/components/insights/ArticleCard";
import portrait from "@/assets/insights/fa-en-oficina.jpg.asset.json";
import logo from "@/assets/insights/logo-ap-rectangular-eslogan.png.asset.json";

export function MarkdownArticlePage({ article }: { article: MarkdownArticle }) {
  const categoryPath = article.categoria === "Estrategia" ? "/insights/estrategia" : "/insights/ia-aplicada";
  const related = articles.filter((other) => other.slug !== article.slug && (other.categoria === article.categoria || "format" in other)).slice(0, 3);
  // The document's original H1 remains the sole page H1; no content is stripped.
  return (
    <article className="pb-20">
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10 pb-8 sm:pt-14">
          <nav aria-label="Ruta del artículo" className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <Link to="/insights" className="underline underline-offset-4">Insights</Link>
            <span aria-hidden> / </span>
            <Link to={categoryPath} className="underline underline-offset-4">{article.categoria}</Link>
          </nav>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <Link to="/sobre-francisco" className="font-semibold text-deep">{article.autor}</Link>
            <time dateTime={article.publishedAt}>{article.fecha}</time>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-8">
          <img src={article.imagen} alt={article.imageAlt} width={1365} height={768} fetchPriority="high" className="w-full aspect-video object-contain rounded-lg" />
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="editorial-markdown space-y-5 text-foreground leading-relaxed [overflow-wrap:anywhere]">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            h1: ({ children }) => <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-deep leading-tight mb-8">{children}</h1>,
            h2: ({ children }) => <h2 className="font-display text-2xl sm:text-3xl text-deep pt-8 pb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="font-display text-xl sm:text-2xl text-deep pt-5">{children}</h3>,
            a: ({ href, children }) => <a href={href} className="font-bold underline underline-offset-4 text-deep decoration-primary-hover hover:decoration-deep" {...(href?.startsWith("https://") && !href.startsWith("https://animapraxis.org/") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>,
            ul: ({ children }) => <ul className="list-disc pl-6 space-y-3">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 space-y-3">{children}</ol>,
            table: ({ children }) => <div className="max-w-full overflow-x-auto rounded-lg border border-border" role="region" aria-label="Tabla del artículo" tabIndex={0}><table className="w-full min-w-[560px] border-collapse text-sm text-left">{children}</table></div>,
            th: ({ children }) => <th scope="col" className="border-b border-border bg-editorial-gold/20 px-4 py-3 font-semibold text-deep">{children}</th>,
            td: ({ children }) => <td className="border-b border-border px-4 py-3 align-top">{children}</td>,
          }}>{article.content}</ReactMarkdown>
        </div>
        <footer className="mt-14 border-y border-border py-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img src={portrait.url} alt="Francisco Avilés en su oficina" width={768} height={873} loading="lazy" className="w-28 h-auto rounded-lg shrink-0" />
            <div className="space-y-3">
              <Link to="/sobre-francisco" className="font-display text-2xl text-deep underline underline-offset-4">{article.autor}</Link>
              <p className="text-sm text-muted-foreground">Anima Praxis</p>
              <img src={logo.url} alt="Anima Praxis. Conciencia que transforma. Acción que enraiza." width={1921} height={768} loading="lazy" className="w-64 max-w-full h-auto" />
            </div>
          </div>
        </footer>
        <section className="mt-12">
          <h2 className="font-display text-2xl sm:text-3xl text-deep mb-6">Otros insights</h2>
          <div className="grid gap-6 sm:grid-cols-3">{related.map((other) => <ArticleCard key={other.slug} article={other} />)}</div>
        </section>
      </div>
    </article>
  );
}
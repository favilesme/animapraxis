import { Link } from "@tanstack/react-router";
import { categories, getArticlesByCategory, type Category } from "@/data/insightsData";
import { ArticleCard } from "@/components/insights/ArticleCard";

/**
 * Vista de una categoría de Insights: encabezado, artículos de la categoría
 * y enlaces a las demás categorías.
 */
export function CategoryPage({ category }: { category: Category }) {
  const list = getArticlesByCategory(category);
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-muted-foreground mb-8">
          <Link to="/insights" className="hover:text-primary-hover transition-colors">
            ← Volver a Insights
          </Link>
        </nav>

        <header className="max-w-2xl">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">
            {category.nombre}
          </h1>
          <p className="mt-4 text-muted-foreground">{category.descripcion}</p>
        </header>

        {list.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {list.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-muted-foreground">
            Aún no hay artículos publicados en esta categoría.
          </p>
        )}

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-display text-2xl text-deep">Explora otras categorías</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={c.path}
                className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-deep transition-all duration-300 hover:bg-cream/40 hover:border-primary"
              >
                {c.nombre}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

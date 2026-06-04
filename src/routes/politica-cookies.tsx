import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-cookies")({
  head: () => ({
    meta: [
      { title: "Política de cookies — Anima Praxis" },
      { name: "description", content: "Uso de cookies en el sitio de Anima Praxis." },
      { property: "og:url", content: "/politica-cookies" },
    ],
    links: [{ rel: "canonical", href: "/politica-cookies" }],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-deep">Política de cookies</h1>
        <div className="mt-8 space-y-6 text-muted-foreground text-sm leading-relaxed">
          <p>
            Este sitio utiliza almacenamiento local del navegador (localStorage) para recordar tu
            preferencia respecto al banner de cookies y mejorar tu experiencia de navegación.
          </p>
          <h2 className="font-display text-xl text-deep">Cookies de terceros</h2>
          <p>
            El asistente conversacional embebido puede instalar cookies propias de su proveedor.
            Detalle: <Falta label="proveedor y finalidades específicas" />.
          </p>
          <h2 className="font-display text-xl text-deep">Cómo gestionarlas</h2>
          <p>
            Puedes borrar las cookies y el almacenamiento local desde la configuración de tu
            navegador en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-cookies")({
  head: () => ({
    meta: [
      { title: "Política de cookies — Anima Praxis" },
      { name: "description", content: "Uso de cookies en el sitio de Anima Praxis." },
      { property: "og:description", content: "Política de cookies, almacenamiento local y uso del asistente conversacional en el sitio de Anima Praxis." },
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
            El asistente conversacional embebido en este sitio es provisto por nubionai.com.
          </p>
          <p>
            Este proveedor utiliza cookies, localStorage u otros identificadores técnicos para las siguientes finalidades:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Mantener activa la sesión del chat.</li>
            <li>Recordar preferencias del usuario relacionadas con el asistente.</li>
            <li>Procesar los mensajes enviados por el usuario.</li>
            <li>Prevenir abuso, spam o uso indebido del servicio.</li>
            <li>Medir el funcionamiento técnico del asistente.</li>
            <li>Mejorar la calidad del servicio, si el proveedor lo realiza y si existe base legal aplicable.</li>
          </ul>
          <p>
            Los datos tratados incluyen identificadores técnicos, dirección IP, fecha y hora de uso, navegador, dispositivo, mensajes enviados por el usuario y cualquier dato que el usuario incluya voluntariamente en la conversación.
          </p>
          <p>
            Más información sobre el lugar de procesamiento de datos y plazos de conservación del proveedor:{" "}
            <a
              href="https://www.nubionai.com/es/privacy-policy"
              className="underline text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.nubionai.com/es/privacy-policy
            </a>
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

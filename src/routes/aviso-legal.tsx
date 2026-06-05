import { createFileRoute } from "@tanstack/react-router";
import { EMAIL, ADDRESS } from "@/lib/contact";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal — Anima Praxis" },
      { name: "description", content: "Información legal de Anima Praxis." },
      { property: "og:description", content: "Información legal, licencias y propiedad intelectual de Anima Praxis." },
      { property: "og:url", content: "/aviso-legal" },
    ],
    links: [{ rel: "canonical", href: "/aviso-legal" }],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-deep">Aviso legal</h1>
        <div className="mt-8 space-y-6 text-muted-foreground text-sm leading-relaxed">
          <p><strong className="text-foreground">Titular:</strong> Francisco Raúl Avilés Merino — Anima Praxis.</p>
          <p><strong className="text-foreground">RUC / identificación fiscal:</strong> 1706784541001.</p>
          <p><strong className="text-foreground">Domicilio profesional:</strong> {ADDRESS}</p>
          <p><strong className="text-foreground">Contacto:</strong> legal@animapraxis.org</p>
          <p>
            El acceso y uso de este sitio implica la aceptación de las condiciones aquí descritas.
            Los contenidos publicados tienen carácter informativo y no constituyen asesoramiento
            clínico, médico ni financiero personalizado.
          </p>

          <h2 className="font-display text-2xl text-foreground pt-4">Licencias y propiedad intelectual</h2>
          <p>
            Todo el contenido propio publicado en este sitio, incluidos textos, artículos, recursos, guías, diseños, metodologías, materiales descargables y elementos de marca, pertenece a Francisco Raúl Avilés Merino, Anima Praxis, salvo que se indique otra titularidad.
          </p>
          <p>
            Se permite compartir enlaces al sitio y citar fragmentos breves con atribución visible a Anima Praxis y enlace a la fuente original.
          </p>
          <p>
            No se autoriza copiar, reproducir, adaptar, vender, distribuir, republicar ni usar el contenido con fines comerciales sin autorización escrita.
          </p>
          <p>
            Las referencias a libros, autores, obras, marcas o materiales de terceros, y sus traducciones, pertenecen a sus respectivos titulares. Anima Praxis no declara afiliación, patrocinio ni respaldo de esos titulares, salvo indicación expresa.
          </p>

          <p>
            Anima Praxis se reserva el derecho de modificar el contenido del sitio sin previo aviso.
          </p>
        </div>
      </div>
    </section>
  );
}

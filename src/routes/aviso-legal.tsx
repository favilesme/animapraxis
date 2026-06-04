import { createFileRoute } from "@tanstack/react-router";
import { Falta } from "@/components/brand/Falta";
import { EMAIL, ADDRESS } from "@/lib/contact";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal — Anima Praxis" },
      { name: "description", content: "Información legal de Anima Praxis." },
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
          <p><strong className="text-foreground">RUC / identificación fiscal:</strong> <Falta label="RUC" />.</p>
          <p><strong className="text-foreground">Domicilio profesional:</strong> {ADDRESS}</p>
          <p><strong className="text-foreground">Contacto:</strong> {EMAIL}</p>
          <p>
            El acceso y uso de este sitio implica la aceptación de las condiciones aquí descritas.
            Los contenidos publicados tienen carácter informativo y no constituyen asesoramiento
            clínico, médico ni financiero personalizado.
          </p>
          <p>
            Anima Praxis se reserva el derecho de modificar el contenido del sitio sin previo aviso.
            Información adicional sobre licencias y propiedad intelectual: <Falta />.
          </p>
        </div>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Falta } from "@/components/brand/Falta";
import { EMAIL } from "@/lib/contact";

export const Route = createFileRoute("/politica-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — Anima Praxis" },
      { name: "description", content: "Cómo Anima Praxis trata los datos personales." },
      { property: "og:url", content: "/politica-privacidad" },
    ],
    links: [{ rel: "canonical", href: "/politica-privacidad" }],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-deep">Política de privacidad</h1>
        <div className="mt-8 space-y-6 text-muted-foreground text-sm leading-relaxed">
          <p>
            Anima Praxis respeta la privacidad de las personas que visitan o se comunican con este
            sitio. Esta política describe cómo recogemos y utilizamos información personal en
            cumplimiento con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP).
          </p>
          <h2 className="font-display text-xl text-deep">Responsable del tratamiento</h2>
          <p>Francisco Raúl Avilés Merino — Anima Praxis. Contacto: {EMAIL}.</p>
          <h2 className="font-display text-xl text-deep">Datos que recopilamos</h2>
          <p>
            Recopilamos únicamente los datos que nos proporcionas voluntariamente al usar el
            formulario de contacto: nombre, email, teléfono (opcional), empresa (opcional), perfil,
            línea de interés y mensaje.
          </p>
          <h2 className="font-display text-xl text-deep">Finalidad</h2>
          <p>Responder tu solicitud y, si corresponde, coordinar una primera conversación.</p>
          <h2 className="font-display text-xl text-deep">Conservación y derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, eliminación, oposición y
            portabilidad escribiéndonos a {EMAIL}. Plazo de conservación de los datos: <Falta />.
          </p>
          <h2 className="font-display text-xl text-deep">Terceros y transferencias</h2>
          <p><Falta label="detalle de proveedores y transferencias internacionales si aplica" /></p>
        </div>
      </div>
    </section>
  );
}

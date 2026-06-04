import { createFileRoute } from "@tanstack/react-router";
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
            portabilidad escribiéndonos a {EMAIL}.
          </p>
          <p>
            Conservamos los datos enviados mediante el formulario de contacto durante 24 meses desde la última interacción, con la finalidad de responder solicitudes, dar seguimiento a conversaciones iniciadas y mantener un registro básico de atención.
          </p>
          <p>
            Si se inicia una relación contractual, comercial o profesional, conservaremos los datos durante el tiempo necesario para gestionar esa relación y cumplir obligaciones legales, contables, tributarias o de defensa de derechos.
          </p>
          <p>
            Cumplido el plazo aplicable, los datos serán eliminados, bloqueados o anonimizados.
          </p>
          <h2 className="font-display text-xl text-deep">Terceros y transferencias</h2>
          <p>
            Para operar este sitio y responder solicitudes, Anima Praxis utiliza proveedores tecnológicos que actúan como encargados del tratamiento de datos personales.
          </p>
          <p>Proveedores utilizados:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Hosting web: Lovable.com, <a href="https://docs.lovable.dev/features/privacy-and-security-settings" className="underline text-foreground" target="_blank" rel="noopener noreferrer">https://docs.lovable.dev/features/privacy-and-security-settings</a></li>
            <li>Correo electrónico: Lovable.com, <a href="https://docs.lovable.dev/features/privacy-and-security-settings" className="underline text-foreground" target="_blank" rel="noopener noreferrer">https://docs.lovable.dev/features/privacy-and-security-settings</a></li>
            <li>Formulario de contacto: Lovable.com, <a href="https://docs.lovable.dev/features/privacy-and-security-settings" className="underline text-foreground" target="_blank" rel="noopener noreferrer">https://docs.lovable.dev/features/privacy-and-security-settings</a></li>
            <li>Asistente conversacional: nubionai.com, <a href="https://www.nubionai.com/es/privacy-policy" className="underline text-foreground" target="_blank" rel="noopener noreferrer">https://www.nubionai.com/es/privacy-policy</a></li>
          </ul>
          <p>
            Estos proveedores tratan datos únicamente para prestar servicios de infraestructura, comunicación, seguridad, atención al usuario, agenda, soporte técnico y mejora operativa del sitio.
          </p>
          <p>
            No vendemos datos personales.
          </p>
          <p>
            Si algún proveedor trata datos fuera de Ecuador, existirá transferencia o comunicación internacional de datos. En ese caso, Anima Praxis aplicará las garantías contractuales y técnicas exigidas por la normativa vigente de protección de datos personales.
          </p>
        </div>
      </div>
    </section>
  );
}

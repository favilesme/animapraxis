import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CALENDLY_URL } from "@/lib/contact";
import infografiaAsset from "@/assets/capacitacion-infografia-v3.png.asset.json";

export const Route = createFileRoute("/capacitacion-corporativa")({
  head: () => ({
    meta: [
      { title: "Liderazgo Organizacional — Anima Praxis" },
      { name: "description", content: "Desarrollo del liderazgo de manera ubicua en todos los niveles de la organización, trascendiendo el ámbito directivo." },
      { property: "og:title", content: "Liderazgo Organizacional — Anima Praxis" },
      { property: "og:description", content: "Programas para potenciar la influencia legítima de cada colaborador hacia sus equipos y stakeholders." },
      { property: "og:url", content: "/capacitacion-corporativa" },
    ],
    links: [{ rel: "canonical", href: "/capacitacion-corporativa" }],
  }),
  component: Page,
});

const programas = [
  "Diagnóstico de necesidades de desarrollo",
  "Diseño de modelo de aprendizaje integrado",
  "Desarrollo de competencias: Programa de habilidades directivas y Gestión de Liderazgo 360",
  "Transferencia e internalización en la operación",
];

function Page() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">Liderazgo Organizacional</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Abordamos el proceso de desarrollo del liderazgo de manera ubicua en todos los niveles
            de la organización, trascendiendo el ámbito directivo. Este enfoque potencia la
            capacidad de influencia legítima de cada colaborador, proyectándose de forma vertical
            y horizontal dentro de la empresa, así como hacia cada uno de sus grupos de interés
            (stakeholders).
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <img src={infografiaAsset.url} alt="Infografía Liderazgo Organizacional" width={1672} height={941} loading="lazy" className="w-full h-auto rounded-xl shadow-md" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-deep">Para quién es</h2>
            <p className="mt-3 text-muted-foreground">
              Empresas que necesitan consolidar el trabajo en equipo y desarrollar competencias
              integrales para estructurar equipos autogestionados de alto rendimiento.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Programas</h2>
            <ul className="mt-3 space-y-2">
              {programas.map((s) => (
                <li key={s} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-primary-hover mt-0.5 shrink-0" /><span>{s}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Cómo diseñamos</h2>
            <p className="mt-3 text-muted-foreground">
              Diagnóstico previo de necesidades, diseño curricular hecho a medida, dinámicas
              prácticas y materiales contextualizados al sector y cultura de la organización.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Transferencia a la operación</h2>
            <p className="mt-3 text-muted-foreground">
              No nos quedamos en el aula: diseñamos seguimientos y prácticas para que el
              aprendizaje se traduzca en cambios concretos en el día a día.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover">
          Reservar cita
        </a>
      </section>
    </>
  );
}

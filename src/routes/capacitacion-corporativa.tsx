import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CALENDLY_URL } from "@/lib/contact";
import infografiaAsset from "@/assets/capacitacion-infografia-v3.png.asset.json";

export const Route = createFileRoute("/capacitacion-corporativa")({
  head: () => ({
    meta: [
      { title: "Liderazgo corporativo personalizado — Anima Praxis" },
      { name: "description", content: "Programas de liderazgo a la medida en comunicación, productividad y formación a medida." },
      { property: "og:title", content: "Liderazgo corporativo personalizado — Anima Praxis" },
      { property: "og:description", content: "Liderazgo corporativo personalizado en comunicación, productividad y formación a medida." },
      { property: "og:url", content: "/capacitacion-corporativa" },
    ],
    links: [{ rel: "canonical", href: "/capacitacion-corporativa" }],
  }),
  component: Page,
});

const servicios = [
  "Habilidades gerenciales",
  "Soft skills corporativas",
  "\n",
  "Formación a la medida",
  "Transferencia a la operación",
];

function Page() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">Liderazgo corporativo personalizado</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Diseñamos programas formativos a la medida de las necesidades reales de tu empresa, con
            foco en liderazgo, comunicación, productividad, cultura, trabajo en equipo y formación a
            medida.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <img src={infografiaAsset.url} alt="Infografía Liderazgo corporativo personalizado" width={1672} height={941} loading="lazy" className="w-full h-auto rounded-xl shadow-md" />
        </div>
      </section>

      <section className="py-16">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-deep">Para quién es</h2>
            <p className="mt-3 text-muted-foreground">
              Empresas que necesitan fortalecer capacidades de sus equipos y líderes con programas
              adaptados a su contexto y desafíos reales.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Programas</h2>
            <ul className="mt-3 space-y-2">
              {servicios.map((s) => (
                <li key={s} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-primary-hover mt-0.5 shrink-0" />{s}</li>
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
              No nos quedamos en el aula: diseñamos seguimientos y prácticas para que el aprendizaje
              se traduzca en cambios concretos en el día a día.
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

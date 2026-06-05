import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CALENDLY_URL } from "@/lib/contact";
import infografiaAsset from "@/assets/consultoria-ia-infografia.png.asset.json";

export const Route = createFileRoute("/consultoria-ia")({
  head: () => ({
    meta: [
      { title: "Consultoría estratégica con IA — Anima Praxis" },
      { name: "description", content: "Planificación estratégica, plan de negocios e implementación práctica de inteligencia artificial." },
      { property: "og:title", content: "Consultoría estratégica con IA — Anima Praxis" },
      { property: "og:description", content: "Consultoría estratégica e implementación práctica de inteligencia artificial para ordenar tu negocio y acelerar decisiones." },
      { property: "og:url", content: "/consultoria-ia" },
    ],
    links: [{ rel: "canonical", href: "/consultoria-ia" }],
  }),
  component: Page,
});

const servicios = [
  "Planificación estratégica",
  "Plan de negocios",
  "Diagnóstico estratégico",
  "Implementación con inteligencia artificial",
  "Acompañamiento de ejecución",
];

function Page() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">Consultoría estratégica con inteligencia artificial</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Ordenamos tu negocio, definimos prioridades y usamos inteligencia artificial como apoyo
            práctico para analizar información, comparar escenarios, mejorar procesos y tomar
            mejores decisiones.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <img
            src={infografiaAsset.url}
            alt="Proceso de consultoría estratégica con inteligencia artificial: ordenamos tu negocio, definimos prioridades, usamos IA como apoyo práctico y tomamos mejores decisiones."
            className="w-full h-auto rounded-xl shadow-md"
            loading="lazy"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-deep">Para quién es</h2>
            <p className="mt-3 text-muted-foreground">
              Empresarios, directivos, emprendedores y equipos que necesitan ordenar su negocio,
              acelerar decisiones y aprovechar la IA con criterio.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Servicios</h2>
            <ul className="mt-3 space-y-2">
              {servicios.map((s) => (
                <li key={s} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-primary-hover mt-0.5 shrink-0" />{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Cómo usamos IA</h2>
            <p className="mt-3 text-muted-foreground">
              Aplicamos IA en análisis de información, generación de escenarios, mejora de procesos,
              productividad y soporte a la toma de decisiones — siempre con tu criterio al centro.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Entregables</h2>
            <p className="mt-3 text-muted-foreground">
              Diagnóstico, hoja de ruta accionable, indicadores, casos de uso priorizados y
              acompañamiento en la ejecución.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-deep text-deep-foreground py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display text-xl text-primary italic">
            "La inteligencia artificial no reemplaza el criterio estratégico del empresario. Lo fortalece con estructura, información y velocidad."
          </p>
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

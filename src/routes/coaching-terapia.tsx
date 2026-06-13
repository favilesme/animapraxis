import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CALENDLY_URL } from "@/lib/contact";
import infografiaAsset from "@/assets/coaching-terapia-infografia-v3.png.asset.json";

export const Route = createFileRoute("/coaching-terapia")({
  head: () => ({
    meta: [
      { title: "Coaching Ontológico — Anima Praxis" },
      { name: "description", content: "Coaching ontológico para líderes, ejecutivos y adultos funcionales: acompañamiento profesional y confidencial en decisiones, transiciones y evolución personal." },
      { property: "og:title", content: "Coaching Ontológico — Anima Praxis" },
      { property: "og:description", content: "Acompañamiento ontológico para expandir espacios de acción, consciencia y aprendizaje." },
      { property: "og:url", content: "/coaching-terapia" },
    ],
    links: [{ rel: "canonical", href: "/coaching-terapia" }],
  }),
  component: Page,
});

const servicios = [
  "Coaching ejecutivo",
  "Liderazgo consciente",
  "Procesos de transición personal",
  "Recursos incorporados en las sesiones: Orientación de profundidad Jungiana y Técnicas de integración cuerpo-mente",
];

function Page() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">Coaching Ontológico</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Acompañamos a líderes, ejecutivos y adultos funcionales en procesos profundos para
            expandir sus espacios de acción, consciencia y aprendizaje.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <img
            src={infografiaAsset.url}
            alt="Coaching ontológico: claridad personal, transición vital o profesional, liderazgo consciente e integración cuerpo-mente."
            width={1672}
            height={941}
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
              Diseñado para líderes, ejecutivos y adultos funcionales que buscan un acompañamiento
              profesional y estrictamente confidencial en momentos clave de toma de decisiones,
              transición adaptativa o evolución personal.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Servicios</h2>
            <ul className="mt-3 space-y-2">
              {servicios.map((s) => (
                <li key={s} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-primary-hover mt-0.5 shrink-0" /><span>{s}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Enfoque</h2>
            <p className="mt-3 text-muted-foreground">
              Integramos coaching ontológico, orientación de profundidad Jungiana y técnicas de
              integración cuerpo-mente. Tono ético, confidencial y respetuoso del proceso de cada
              persona.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Qué esperar</h2>
            <p className="mt-3 text-muted-foreground">
              Primera sesión exploratoria para evaluar encaje. Luego se define una frecuencia y
              alcance acordes a la necesidad.
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

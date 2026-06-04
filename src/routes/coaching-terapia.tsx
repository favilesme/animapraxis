import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";
import infografiaAsset from "@/assets/coaching-terapia-infografia.png.asset.json";

export const Route = createFileRoute("/coaching-terapia")({
  head: () => ({
    meta: [
      { title: "Coaching y terapia de profundidad — Anima Praxis" },
      { name: "description", content: "Coaching ejecutivo, terapia de profundidad junguiana y prácticas integrativas cuerpo-mente." },
      { property: "og:title", content: "Coaching y terapia de profundidad — Anima Praxis" },
      { property: "og:description", content: "Acompañamiento para procesos de claridad, transición y liderazgo consciente." },
      { property: "og:url", content: "/coaching-terapia" },
    ],
    links: [{ rel: "canonical", href: "/coaching-terapia" }],
  }),
  component: Page,
});

const servicios = [
  "Coaching ejecutivo",
  "Terapia de profundidad de orientación junguiana",
  "Terapias integrativas cuerpo-mente",
  "Procesos de transición personal",
  "Liderazgo consciente",
];

function Page() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">Coaching, terapia de profundidad y transformación personal</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Acompañamos a profesionales, empresarios, líderes y personas adultas en procesos de
            claridad, transición, crisis de sentido, gestión emocional y liderazgo consciente.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-deep">Para quién es</h2>
            <p className="mt-3 text-muted-foreground">
              Personas adultas que buscan acompañamiento profesional confidencial en momentos de
              decisión, transición o evolución personal.
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
            <h2 className="font-display text-2xl text-deep">Enfoque</h2>
            <p className="mt-3 text-muted-foreground">
              Integramos coaching ontológico, terapia de profundidad y recursos de autorregulación
              cuerpo-mente. Tono ético, confidencial y respetuoso del proceso de cada persona.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-deep">Qué esperar</h2>
            <p className="mt-3 text-muted-foreground">
              Primera sesión exploratoria para evaluar encaje. Luego se define una frecuencia y
              alcance acordes a la necesidad. No prometemos curas; sí ofrecemos acompañamiento serio.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover">
          Agenda una sesión inicial
        </a>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CALENDLY_URL } from "@/lib/contact";
import infografiaAsset from "@/assets/consultoria-ia-infografia-v2.jpg.asset.json";

export const Route = createFileRoute("/consultoria-ia")({
  head: () => ({
    meta: [
      { title: "Consultoría Estratégica — Anima Praxis" },
      { name: "description", content: "Consultoría estratégica con integración transversal de inteligencia artificial para acelerar y blindar el desarrollo de planes y esquemas de trabajo de alto nivel." },
      { property: "og:title", content: "Consultoría Estratégica — Anima Praxis" },
      { property: "og:description", content: "Integramos IA de forma transversal en todos nuestros procesos de consultoría corporativa para potenciar planes estratégicos y esquemas de trabajo." },
      { property: "og:url", content: "/consultoria-ia" },
    ],
    links: [{ rel: "canonical", href: "/consultoria-ia" }],
  }),
  component: Page,
});

const servicios = [
  "Planificación estratégica y Plan de negocios",
  "Metodologías consultivas de estrategia: Árbol de Problemas MECE, Análisis DAFO cuantitativo, Análisis PORTER (5F), Cadena de Valor, y Enfoque DMAIC (6 Sigma)",
  "Transformación organizacional: Modelo de Operación, Gobernanza, KPIs estructurales y Gestión y Adopción del cambio",
];

function Page() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">Consultoría Estratégica</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Integramos de forma transversal la inteligencia artificial en todos nuestros procesos
            de consultoría corporativa para acelerar, potenciar y blindar el desarrollo de planes
            estratégicos y esquemas de trabajo de alto nivel.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <img
            src={infografiaAsset.url}
            alt="Proceso de consultoría estratégica con integración transversal de inteligencia artificial."
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
              Empresarios, directivos, emprendedores y equipos que necesitan ordenar su negocio,
              acelerar decisiones y aprovechar la IA con criterio.
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
            <h2 className="font-display text-2xl text-deep">Cómo usamos la IA</h2>
            <p className="mt-3 text-muted-foreground">
              La inteligencia artificial actúa como un catalizador transversal que maximiza la
              agilidad, la calidad analítica y la precisión milimétrica en cada etapa de nuestros
              procesos de consultoría.
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

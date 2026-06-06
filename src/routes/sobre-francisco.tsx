import { createFileRoute } from "@tanstack/react-router";
import { WHATSAPP_URL } from "@/lib/contact";
import francisco from "@/assets/francisco-aviles.png.asset.json";

export const Route = createFileRoute("/sobre-francisco")({
  head: () => ({
    meta: [
      { title: "Sobre Francisco Avilés — Anima Praxis" },
      { name: "description", content: "Consultor, coach ontológico con aval ICF, terapeuta Lux Esse y capacitador corporativo con 25 años de trayectoria." },
      { property: "og:title", content: "Sobre Francisco Avilés — Anima Praxis" },
      { property: "og:description", content: "Estrategia, IA y desarrollo humano integrados en una práctica boutique." },
      { property: "og:url", content: "/sobre-francisco" },
      { property: "og:image", content: francisco.url },
    ],
    links: [{ rel: "canonical", href: "/sobre-francisco" }],
  }),
  component: Page,
});

const credenciales = [
  "MBA en Negocios Internacionales, ITESM, México",
  "Licenciatura en Administración de Empresas, PUCE, Ecuador",
  "Coach Ontológico Profesional, Coaching Hall International, con aval ICF",
  "Terapeuta Lux Esse",
  "Especialización en Inteligencia Artificial",
  "IBM Data Science Professional Certificate",
  "Generative AI for Data Science, IBM",
  "Machine Learning with Python, IBM",
  "Data Analysis & Visualization with Python, IBM",
  "AWS Cloud Practitioner",
];

function Page() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl text-deep">Sobre Francisco Avilés</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Consultor, coach, facilitador y especialista en estrategia, inteligencia artificial
              aplicada, liderazgo y desarrollo humano. Con 25 años de trayectoria profesional.
            </p>
          </div>
          <img
            src={francisco.url}
            alt="Francisco Avilés sentado en su despacho profesional"
            width={832}
            height={1248}
            className="rounded-2xl shadow-xl w-full object-cover aspect-[4/5]"
            loading="lazy"
          />
        </div>
      </section>

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose-base">
          <h2 className="font-display text-2xl text-deep">Historia profesional</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Francisco Avilés es consultor empresarial, coach ontológico profesional con aval ICF,
            terapeuta Lux Esse y capacitador corporativo con 25 años de trayectoria profesional. Su
            trabajo integra estrategia, inteligencia artificial y desarrollo humano para acompañar
            a personas, líderes, emprendedores y organizaciones en procesos de claridad,
            transformación y crecimiento.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A lo largo de su carrera ha ocupado posiciones ejecutivas y consultivas en organizaciones
            nacionales e internacionales como Ernst & Young, Coca-Cola, American Airlines,
            Avilés Consultores Asociados e importantes empresas nacionales. También ha acompañado
            procesos de consultoría, capacitación y transformación en empresas como Holcim,
            Cervecería Nacional, Metropolitan Touring, Tecniseguros, Seguros del Pichincha,
            Disensa, Financoop, Camposanto La Paz e Hilos Pinto, entre otras.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Paralelamente a su actividad consultiva, ha sido docente y académico en programas de
            pregrado y posgrado de reconocidas universidades. En la Universidad de las Américas ha
            impartido cursos de Dirección, Estrategia y Administración; en la Universidad
            Internacional SEK ha contribuido al Posgrado en Habilidades Gerenciales; y en la
            Universidad Simón Bolívar ha contribuido en la escuela de posgrado enseñando
            Estadística Aplicada para la Toma de Decisiones. Esta vinculación académica fortalece su
            práctica con rigor conceptual y una mirada actualizada sobre la gestión organizacional.
          </p>

          <h2 className="mt-12 font-display text-2xl text-deep">Enfoque de trabajo</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Su enfoque profesional nace de una integración entre experiencia ejecutiva, práctica
            consultiva y proceso personal. A lo largo de su vida ha atravesado retos profundos —entre
            ellos un accidente grave con consecuencias físicas severas, un proceso familiar difícil
            y desafíos de salud superados desde etapas tempranas— que no se presentan desde la
            victimización, sino como parte de una trayectoria de aprendizaje, fortaleza y
            sensibilidad humana.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Desde esa experiencia, Francisco acompaña a personas y organizaciones que buscan
            recuperar claridad, tomar mejores decisiones, atravesar crisis, fortalecer su liderazgo
            y avanzar con mayor coherencia.
          </p>

          <h2 className="mt-12 font-display text-2xl text-deep">Áreas de experiencia</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Pensamiento estratégico, inteligencia artificial aplicada, coaching ontológico, terapia
            de profundidad, recursos de autorregulación física y emocional, y capacitación práctica.
          </p>

          <h2 className="mt-12 font-display text-2xl text-deep">Formación y credenciales</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            {credenciales.map((c) => (
              <li key={c} className="text-sm">• {c}</li>
            ))}
          </ul>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
            Incorpora recursos de autorregulación física y emocional basados en procesos de
            bilateralización cerebral —como Brainspotting, tapping y prácticas afines— como
            herramientas de apoyo dentro de procesos de acompañamiento personal.
          </p>

          <h2 className="mt-12 font-display text-2xl text-deep">Filosofía de Anima Praxis</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Su propósito es claro: acompañar a personas y organizaciones a crecer con claridad,
            propósito y capacidad de acción, integrando estrategia, inteligencia artificial y
            desarrollo humano.
          </p>
        </div>
      </article>

      <section className="bg-deep text-deep-foreground py-12 text-center">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover">
          Agenda una conversación
        </a>
      </section>
    </>
  );
}

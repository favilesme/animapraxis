import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MapPin, Sparkles, Compass, Layers } from "lucide-react";
import { WHATSAPP_URL, CALENDLY_URL, ADDRESS, MAPS_URL } from "@/lib/contact";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { faqSchema } from "@/data/faq-schema";
import { dimensiones } from "@/data/dimensiones";
import francisco from "@/assets/francisco-aviles.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anima Praxis — Estrategia, Coaching y Liderazgo Consciente" },
      { name: "description", content: "Consultoría estratégica con IA, coaching y liderazgo consciente. Reserva tu primera conversación." },
      { property: "og:title", content: "Anima Praxis — Estrategia, Coaching y Liderazgo Consciente" },
      { property: "og:description", content: "Consultoría estratégica, coaching y liderazgo consciente con la aplicación transversal de inteligencia artificial para claridad y crecimiento." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSchema.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});



const faqs = [
  {
    q: "¿Cuánto dura un proceso de planificación estratégica?",
    a: "Depende del alcance, tamaño del negocio y nivel de información disponible. En una primera conversación revisamos tu situación y definimos una ruta de trabajo.",
  },
  {
    q: "¿El coaching ontológico es para todo el mundo?",
    a: "Es un espacio para personas adultas que buscan claridad, autoconocimiento, gestión emocional o acompañamiento en decisiones y transiciones. En la primera sesión revisamos si el enfoque calza con tu necesidad.",
  },
  {
    q: "¿Puedo pagar a plazos?",
    a: "Las condiciones de pago se revisan según el servicio, duración y alcance del proceso.",
  },
  {
    q: "¿Cuándo veré resultados?",
    a: "Buscamos avances desde las primeras conversaciones o implementaciones, pero los resultados dependen del compromiso, contexto y tipo de proceso.",
  },
  {
    q: "¿Cómo sé si esto será útil para mí o mi empresa?",
    a: "La primera evaluación permite entender tu situación y recomendar el camino más adecuado.",
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-tight text-deep break-words hyphens-auto">
              Claridad estratégica, coaching y liderazgo consciente para avanzar con sentido
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Anima Praxis integra consultoría estratégica, coaching, y liderazgo consciente con la aplicación transversal de inteligencia artificial para ayudarte a tomar mejores decisiones,
              ordenar prioridades y transformar tu forma de operar, liderar y crecer.
            </p>
            <p className="mt-4 italic text-primary-hover font-display text-3xl">
              Conciencia que transforma. Acción que enraíza.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
              >
                Reservar cita
              </a>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("anima:open-chat"))}
                className="rounded-md border border-deep px-6 py-3 font-semibold text-deep hover:bg-deep hover:text-deep-foreground transition-colors"
              >
                Chatea con nosotros
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl" aria-hidden />
            <img
              src={francisco.url}
              alt="Francisco Avilés en su despacho profesional"
              loading="eager"
              width={832}
              height={1248}
              className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/5]"
            />

          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Empresas, líderes y profesionales confiaron en Anima Praxis para ordenar decisiones,
            fortalecer equipos y avanzar con foco.
          </p>
          <div className="mt-8">
            <ClientsMarquee />
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            25 años de experiencia profesional aplicada.
          </p>
        </div>
      </section>

      {/* Por qué */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-deep text-center">Por qué Anima Praxis</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: Compass, title: "Primero entendemos tu realidad", text: "Partimos de tu contexto, tus decisiones, tus bloqueos y tus prioridades. Luego diseñamos una ruta clara y aplicable." },
              { icon: Sparkles, title: "Claridad que se traduce en acción", text: "Ordenamos información, conversaciones, indicadores y decisiones para avanzar con foco y medir progreso." },
              { icon: Layers, title: "Transformación sostenida", text: "Integramos estrategia, coaching y liderazgo consciente para fortalecer capacidades y sostener cambios en el tiempo." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border p-6 bg-background hover:shadow-md transition-shadow">
                <Icon className="h-8 w-8 text-primary-hover" />
                <h3 className="mt-4 font-display text-xl text-deep">{title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dimensiones */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-deep text-center">Nuestras tres dimensiones</h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Un marco integrado que articula estrategia, conciencia y liderazgo para impulsar
            resultados sostenibles en personas y organizaciones.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {dimensiones.map((d) => {
              const Icon = d.icon;
              return (
                <article key={d.title} className="flex flex-col rounded-2xl bg-background border border-border p-6 sm:p-8 shadow-sm">
                  <Icon className="h-8 w-8 text-primary-hover" />
                  <h3 className="mt-4 font-display text-2xl text-deep">{d.title}</h3>
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                  <ul className="mt-5 space-y-2 flex-1">
                    {d.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary-hover mt-0.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={d.href}
                    className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
                  >
                    Conocer más
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      

      {/* Cómo llegar */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-deep">Cómo llegar</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Estamos en zona céntrica, con acceso cómodo por transporte público o privado.
            Tenemos parking propio y atención en español e inglés.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 text-deep font-semibold">
            <MapPin className="h-5 w-5 text-primary-hover" />
            {ADDRESS}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="rounded-md border border-deep px-5 py-2.5 font-semibold text-deep hover:bg-deep hover:text-deep-foreground transition-colors">
              Ver en Google Maps
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:bg-primary-hover transition-colors">
              Cómo llegar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-deep text-center">Preguntas frecuentes</h2>
          <div className="mt-10 divide-y divide-border rounded-2xl bg-background border border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-semibold text-deep">
                  {f.q}
                  <span className="text-primary-hover text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Historias y experiencias */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-deep text-center">Historias y experiencias</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <blockquote className="rounded-2xl border border-border bg-cream/60 p-8 sm:p-10 relative">
              <span className="absolute top-4 left-6 text-6xl text-primary/30 font-display leading-none">"</span>
              <p className="text-deep leading-relaxed relative z-10 pt-4">
                El Ing. Francisco Avilés es un profesional de excelente formación y sólidos conocimientos que trabajó en Ernst & Young Ecuador, donde soy el CEO & Country Managing Partner. El Ing. Avilés es un profesional de mucha iniciativa y con un fuerte enfoque en proyectos de negocios y resultados. Su amplia experiencia profesional, relaciones comerciales y conocimiento de mercado, fueron cruciales para enfrentar los desafíos de EY Ecuador dentro de la práctica de consultoría.
              </p>
              <footer className="mt-6 pt-6 border-t border-border/60 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-deep flex items-center justify-center text-deep-foreground font-semibold text-lg shrink-0">
                  JS
                </div>
                <div>
                  <p className="font-semibold text-deep">Javier Salazar</p>
                  <p className="text-sm text-muted-foreground">CEO & Country Managing Partner</p>
                  <p className="text-sm text-muted-foreground">@Ernst & Young Ecuador</p>
                </div>
              </footer>
            </blockquote>

            <blockquote className="rounded-2xl border border-border bg-cream/60 p-8 sm:p-10 relative">
              <span className="absolute top-4 left-6 text-6xl text-primary/30 font-display leading-none">"</span>
              <p className="text-deep leading-relaxed relative z-10 pt-4">
                Tuve el gusto de trabajar con Francisco en la implementación de nuestra planificación estratégica y en el liderazgo del área comercial. Desde el inicio, demostró una visión clara para identificar oportunidades y resolver desafíos, logrando alinear los objetivos de la empresa con acciones concretas y medibles. Gracias a su capacidad de análisis, su enfoque estructurado y su compromiso con los resultados, optimizamos procesos clave, fortalecimos la gestión comercial y consolidamos un equipo más enfocado y eficiente. Su liderazgo generó mejoras tangibles en nuestro rendimiento y aportó estabilidad a la operación. Francisco es un profesional íntegro, estratégico y orientado al logro, capaz de aportar valor real a cualquier organización.
              </p>
              <footer className="mt-6 pt-6 border-t border-border/60 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-deep flex items-center justify-center text-deep-foreground font-semibold text-lg shrink-0">
                  FA
                </div>
                <div>
                  <p className="font-semibold text-deep">Felipe Arpi</p>
                  <p className="text-sm text-muted-foreground">Gerente General</p>
                  <p className="text-sm text-muted-foreground">@Columtrad</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-deep text-deep-foreground py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">
            Conversemos sobre lo que necesitas ordenar, transformar o fortalecer
          </h2>
          <p className="mt-4 text-deep-foreground">
            Cuéntanos tu situación y definimos juntos el próximo paso.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover transition-colors">
              Reservar cita
            </a>
            <Link to="/contacto" className="rounded-md border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              Ir al formulario
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

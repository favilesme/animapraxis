import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MapPin, Sparkles, Compass, Layers } from "lucide-react";
import { Falta } from "@/components/brand/Falta";
import { WHATSAPP_URL, CALENDLY_URL, ADDRESS, MAPS_URL } from "@/lib/contact";
import francisco from "@/assets/francisco-aviles.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anima Praxis — Estrategia, IA y desarrollo humano" },
      { name: "description", content: "Consultoría estratégica con IA, coaching, terapia de profundidad y capacitación corporativa. Reserva tu primera conversación." },
      { property: "og:title", content: "Anima Praxis" },
      { property: "og:description", content: "Claridad estratégica, IA y desarrollo humano." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const packs = [
  {
    name: "PACK PE",
    title: "Plan Estratégico y Esquemas Consultivos",
    desc: "Convierte la visión de tu empresa en una hoja de ruta clara, medible y ejecutable para crecer con dirección, foco y resultados sostenibles.",
    items: ["Diagnóstico estratégico", "Objetivos y prioridades", "Indicadores", "Hoja de ruta", "Acompañamiento ejecutivo"],
  },
  {
    name: "PACK IA",
    title: "Implementación y Aceleración con IA",
    desc: "Integra inteligencia artificial en procesos clave para aumentar productividad, mejorar decisiones y multiplicar capacidades humanas.",
    items: ["Diagnóstico de oportunidades IA", "Casos de uso priorizados", "Productividad y automatización", "Análisis de información", "Gestión comercial y contenidos"],
  },
  {
    name: "PACK CT",
    title: "Coaching, Terapia de Profundidad y Cuerpo-Mente",
    desc: "Un espacio de transformación personal para líderes y profesionales que buscan claridad, equilibrio, propósito y evolución consciente de su vida y trabajo.",
    items: ["Coaching ejecutivo", "Terapia de profundidad", "Liderazgo consciente", "Procesos de transición", "Recursos cuerpo-mente"],
  },
  {
    name: "PACK CA",
    title: "Capacitación ajustada a tus necesidades reales",
    desc: "Programas diseñados a la medida de tu organización, centrados en desafíos reales y orientados a transferir el aprendizaje a la acción.",
    items: ["Diagnóstico de necesidades", "Habilidades gerenciales", "Soft skills", "Innovación con IA", "Transferencia a la operación"],
  },
];

const faqs = [
  {
    q: "¿Cuánto dura un proceso de planificación estratégica?",
    a: "Depende del alcance, tamaño del negocio y nivel de información disponible. En una primera conversación revisamos tu contexto y definimos una ruta de trabajo.",
  },
  {
    q: "¿El coaching y la terapia de profundidad son para todo el mundo?",
    a: "Son espacios para personas adultas que buscan claridad, autoconocimiento, gestión emocional o acompañamiento en decisiones y transiciones. En la primera sesión revisamos si el enfoque calza con tu necesidad.",
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
              Claridad estratégica, inteligencia artificial y desarrollo humano para avanzar con sentido
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Anima Praxis integra consultoría estratégica, inteligencia artificial aplicada, coaching,
              terapia de profundidad y capacitación corporativa para ayudarte a tomar mejores decisiones,
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
              className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/5]"
            />

          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Empresas, líderes y profesionales confían en Anima Praxis para ordenar decisiones,
            fortalecer equipos y avanzar con foco.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            {["Servicios", "Comercio", "Educación", "Manufactura", "Profesionales independientes"].map((s) => (
              <span key={s} className="rounded-full border border-border px-4 py-1.5 text-muted-foreground">
                {s}
              </span>
            ))}
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
              { icon: Layers, title: "Transformación sostenida", text: "Integramos estrategia, inteligencia artificial y desarrollo humano para fortalecer capacidades y sostener cambios en el tiempo." },
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

      {/* Servicios */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-deep text-center">Nuestros servicios</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {packs.map((p) => (
              <article key={p.name} className="flex flex-col rounded-2xl bg-background border border-border p-6 sm:p-8 shadow-sm">
                <span className="text-xs font-semibold text-primary-hover tracking-widest">{p.name}</span>
                <h3 className="mt-2 font-display text-2xl text-deep">{p.title}</h3>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary-hover mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
                >
                  Reservar pack
                </a>
              </article>
            ))}
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

      {/* Historias placeholder */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-deep text-center">Historias y experiencias</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Próximamente incorporaremos testimonios reales de clientes y consultantes, con
            autorización expresa.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-dashed border-border p-6 bg-cream/50">
                <Falta label={`testimonio real ${i}`} />
              </div>
            ))}
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

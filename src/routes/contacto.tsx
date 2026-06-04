import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { WHATSAPP_URL, EMAIL } from "@/lib/contact";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Anima Praxis" },
      { name: "description", content: "Agenda una conversación con Anima Praxis. Cuéntanos qué necesitas ordenar, transformar o fortalecer." },
      { property: "og:title", content: "Contacto — Anima Praxis" },
      { property: "og:description", content: "Agenda una primera conversación." },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Page,
});

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre completo").max(120),
  email: z.string().trim().email("Email inválido").max(180),
  telefono: z.string().trim().max(40).optional().or(z.literal("")),
  empresa: z.string().trim().max(160).optional().or(z.literal("")),
  perfil: z.string().min(1, "Selecciona un perfil"),
  linea: z.string().min(1, "Selecciona una línea de interés"),
  mensaje: z.string().trim().min(10, "Cuéntanos brevemente tu situación").max(2000),
  consentimiento: z.literal(true, { errorMap: () => ({ message: "Necesitamos tu consentimiento" }) }),
});

type FormValues = z.infer<typeof schema>;

function Page() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { perfil: "", linea: "", consentimiento: false as unknown as true },
  });

  const onSubmit = async (_data: FormValues) => {
    // Frontend-only: no backend conectado todavía.
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
  };

  const fieldErr = "text-xs text-destructive mt-1";
  const inputCls = "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary outline-none";

  return (
    <>
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-deep">Agenda una conversación con Anima Praxis</h1>
          <p className="mt-4 text-muted-foreground">
            Cuéntanos qué necesitas ordenar, transformar o fortalecer. Te contactaremos para
            coordinar una primera conversación.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover">
              Prefiero WhatsApp directo
            </a>
            <a href={`mailto:${EMAIL}`} className="inline-flex rounded-md border border-deep px-6 py-3 font-semibold text-deep hover:bg-deep hover:text-deep-foreground transition-colors">
              Escríbenos a {EMAIL}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {sent ? (
            <div className="rounded-2xl border border-primary/40 bg-cream p-8 text-center">
              <h2 className="font-display text-2xl text-deep">Gracias. Recibimos tu solicitud.</h2>
              <p className="mt-3 text-muted-foreground">
                Te contactaremos pronto. Si lo prefieres, también puedes escribirnos por WhatsApp o a{" "}
                <a href={`mailto:${EMAIL}`} className="text-primary-hover underline">{EMAIL}</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium mb-1">Nombre completo *</label>
                <input id="nombre" type="text" autoComplete="name" className={inputCls} {...register("nombre")} />
                {errors.nombre && <p className={fieldErr}>{errors.nombre.message}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                  <input id="email" type="email" autoComplete="email" className={inputCls} {...register("email")} />
                  {errors.email && <p className={fieldErr}>{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium mb-1">Teléfono</label>
                  <input id="telefono" type="tel" autoComplete="tel" className={inputCls} {...register("telefono")} />
                </div>
              </div>
              <div>
                <label htmlFor="empresa" className="block text-sm font-medium mb-1">Empresa u organización</label>
                <input id="empresa" type="text" autoComplete="organization" className={inputCls} {...register("empresa")} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="perfil" className="block text-sm font-medium mb-1">Perfil *</label>
                  <select id="perfil" className={inputCls} {...register("perfil")}>
                    <option value="">Selecciona…</option>
                    <option>Empresario</option>
                    <option>Emprendedor</option>
                    <option>Directivo</option>
                    <option>Profesional</option>
                    <option>Persona en proceso personal</option>
                    <option>Equipo corporativo</option>
                  </select>
                  {errors.perfil && <p className={fieldErr}>{errors.perfil.message}</p>}
                </div>
                <div>
                  <label htmlFor="linea" className="block text-sm font-medium mb-1">Línea de interés *</label>
                  <select id="linea" className={inputCls} {...register("linea")}>
                    <option value="">Selecciona…</option>
                    <option>Consultoría estratégica con IA</option>
                    <option>Coaching y terapia de profundidad</option>
                    <option>Capacitación corporativa personalizada</option>
                    <option>No estoy seguro</option>
                  </select>
                  {errors.linea && <p className={fieldErr}>{errors.linea.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium mb-1">Mensaje *</label>
                <textarea id="mensaje" rows={5} className={inputCls} {...register("mensaje")} />
                {errors.mensaje && <p className={fieldErr}>{errors.mensaje.message}</p>}
              </div>
              <div>
                <label className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1" {...register("consentimiento")} />
                  <span>Acepto ser contactado por Anima Praxis respecto a esta solicitud.</span>
                </label>
                {errors.consentimiento && <p className={fieldErr}>{errors.consentimiento.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
              >
                {isSubmitting ? "Enviando…" : "Enviar solicitud"}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                El formulario aún no envía a un destino real. Por ahora, contáctanos por WhatsApp o email.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

import { AnimaChat } from "@/components/chat/AnimaChat";

export function ChatSection() {
  return (
    <section id="chat" className="bg-cream py-16 sm:py-24" aria-label="Chatea con Anima Praxis">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl sm:text-4xl text-deep">
            Chatea con Anima Praxis
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Pregunta lo que necesites sobre servicios, horarios, ubicación o próximos
            pasos. Nuestro asistente te orienta al instante.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border shadow-md bg-background">
          <AnimaChat heightClassName="h-[600px]" />
        </div>
      </div>
    </section>
  );
}

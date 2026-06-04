export function ChatSection() {
  return (
    <section id="chat" className="bg-cream py-16 sm:py-24" aria-label="Chatea con Anima Praxis">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl sm:text-4xl text-deep">
            Chatea con Anima Praxis
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Pregunta lo que necesites sobre servicios, horarios, ubicación o próximos
            pasos. Nuestro asistente Anima Praxis te orienta al instante.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border shadow-md bg-background">
          <iframe
            title="Asistente Anima Praxis"
            src="https://centeia-sass-gsxz.onrender.com/api/widget/0a1389ee-a74d-4868-947c-681c930ca6c5"
            className="w-full h-[600px] block"
            frameBorder={0}
          />
        </div>
      </div>
    </section>
  );
}

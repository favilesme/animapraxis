import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

export function FAB() {
  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-30 flex-col gap-3">
      <a
        href="#chat"
        className="inline-flex items-center gap-2 rounded-full bg-deep text-deep-foreground px-5 py-3 shadow-lg hover:bg-deep/90 transition-colors"
        aria-label="Chatea con Anima Praxis"
      >
        <MessageCircle className="h-5 w-5" />
        Chatear
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 shadow-lg hover:bg-primary-hover transition-colors font-semibold"
        aria-label="Abrir WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}

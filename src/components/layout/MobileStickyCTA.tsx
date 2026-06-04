import { WHATSAPP_URL } from "@/lib/contact";

export function MobileStickyCTA() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:hidden fixed inset-x-0 bottom-0 z-30 bg-primary text-primary-foreground text-center py-3.5 font-semibold shadow-lg hover:bg-primary-hover transition-colors"
      aria-label="Reservar cita por WhatsApp"
    >
      Reservar cita por WhatsApp
    </a>
  );
}

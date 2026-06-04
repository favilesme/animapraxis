import { CALENDLY_URL } from "@/lib/contact";

export function TopBar() {
  return (
    <div className="w-full bg-deep text-deep-foreground text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center bg-orange-100">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors text-orange-400"
        >
          Pide cita hoy y agenda tu primera evaluación sin costo
        </a>
      </div>
    </div>
  );
}

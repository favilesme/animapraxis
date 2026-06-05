import { CALENDLY_URL } from "@/lib/contact";

export function TopBar() {
  return (
    <div className="w-full bg-deep text-deep-foreground text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center bg-[#e6c89e]">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-200 rounded-xl text-indigo-900 hover:font-bold hover:scale-105 inline-block"
        >
          Pide cita hoy y agenda tu primera evaluación sin costo
        </a>
      </div>
    </div>
  );
}

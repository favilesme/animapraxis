import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { WHATSAPP_URL } from "@/lib/contact";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/consultoria-ia", label: "Consultoría + IA" },
  { to: "/coaching-terapia", label: "Coaching y Terapia" },
  { to: "/capacitacion-corporativa", label: "Capacitación" },
  { to: "/sobre-francisco", label: "Sobre Francisco" },
  { to: "/insights", label: "Insights" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 w-full bg-background border-b border-border shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link to="/" aria-label="Anima Praxis — Inicio" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm text-foreground/80 hover:text-primary-hover rounded-md transition-colors"
                activeProps={{ className: "text-primary-hover font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Reservar cita
          </a>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-cream"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav aria-label="Móvil" className="lg:hidden pb-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-base text-foreground hover:bg-cream"
                    activeProps={{ className: "text-primary-hover font-semibold bg-cream" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center rounded-md bg-primary px-4 py-2.5 text-base font-semibold text-primary-foreground"
                >
                  Reservar cita
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

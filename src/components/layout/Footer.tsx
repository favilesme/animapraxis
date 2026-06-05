import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { WHATSAPP_URL, WHATSAPP_DISPLAY, EMAIL, ADDRESS } from "@/lib/contact";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-deep text-deep-foreground mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 bg-[#040c2a]">
          <div>
            <Logo variant="footer" />
            <p className="mt-4 text-sm text-deep-foreground leading-relaxed">
              Anima Praxis integra estrategia, inteligencia artificial y desarrollo
              humano para personas y organizaciones que buscan avanzar con claridad,
              coherencia y capacidad de acción.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg text-primary mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Inicio"],
                ["/consultoria-ia", "Consultoría + IA"],
                ["/coaching-terapia", "Coaching y Terapia"],
                ["/capacitacion-corporativa", "Capacitación"],
                ["/sobre-francisco", "Sobre Francisco"],
                ["/insights", "Insights"],
                ["/contacto", "Contacto"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-primary mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-primary transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="text-deep-foreground">{ADDRESS}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-primary mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/aviso-legal" className="hover:text-primary transition-colors">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="hover:text-primary transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/politica-cookies" className="hover:text-primary transition-colors">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-deep-foreground/20 text-xs text-deep-foreground/80 text-center">
          © {year} Anima Praxis. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

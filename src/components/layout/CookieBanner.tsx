import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "anima-cookies-accepted";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);
  if (!visible) return null;
  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-2 bottom-20 sm:bottom-4 z-40 mx-auto max-w-3xl rounded-xl border border-border bg-background shadow-lg p-4 sm:p-5"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
        <p className="text-sm text-foreground flex-1">
          Usamos cookies para mejorar tu experiencia. Puedes aceptar o revisar nuestra política.
        </p>
        <div className="flex gap-2 shrink-0">
          <Link
            to="/politica-cookies"
            className="inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-cream"
          >
            Ver política
          </Link>
          <button
            type="button"
            onClick={() => {
              try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
              setVisible(false);
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

export function FAB() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("anima:open-chat", handler);
    return () => window.removeEventListener("anima:open-chat", handler);
  }, []);

  return (
    <>
      {open && (
        <div
          className="fixed z-40 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden
                     inset-x-3 bottom-24 sm:inset-x-auto sm:right-6 sm:bottom-24
                     sm:w-[380px] h-[70vh] sm:h-[560px] max-h-[80vh] flex flex-col"
          role="dialog"
          aria-label="Asistente Anima Praxis"
        >
          <div className="flex items-center justify-between bg-deep text-deep-foreground px-4 py-2.5">
            <span className="font-display text-sm">Asistente Anima Praxis</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="rounded-md p-1 hover:bg-deep-foreground/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <iframe
            title="Asistente Anima Praxis"
            src="https://centeia-sass-gsxz.onrender.com/api/widget/0a1389ee-a74d-4868-947c-681c930ca6c5"
            className="w-full flex-1 block"
            frameBorder={0}
          />
        </div>
      )}

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-deep text-deep-foreground px-4 py-3 shadow-lg hover:bg-deep/90 transition-colors"
          aria-label={open ? "Cerrar chat" : "Chatea con Anima Praxis"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          <span className="hidden sm:inline">{open ? "Cerrar" : "Chatear"}</span>
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 shadow-lg hover:bg-primary-hover transition-colors font-semibold"
          aria-label="Abrir WhatsApp"
        >
          <span className="hidden sm:inline">WhatsApp</span>
          <svg className="h-5 w-5 sm:hidden" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.94 11.94 0 0 0 1.64 6.04L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.25-6.19-3.48-8.52ZM12 22a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.23-.37A9.94 9.94 0 1 1 22 12c0 5.52-4.48 10-10 10Zm5.49-7.46c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z"/>
          </svg>
        </a>
      </div>
    </>
  );
}

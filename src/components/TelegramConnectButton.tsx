import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BOT_USERNAME = "TeleAnimaPraxis_bot";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38Z" />
    </svg>
  );
}

export function TelegramConnectButton() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data, error }) => {
      if (cancelled) return;
      if (!error && data.user) {
        setUser({ id: data.user.id });
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const handleClick = () => {
    if (!user) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      return;
    }
    const url = `https://t.me/${BOT_USERNAME}?start=${user.id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 rounded-full bg-[#2AABEE] text-white px-4 py-3 shadow-lg opacity-60 cursor-not-allowed"
        aria-label="Cargando estado de Telegram"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="hidden sm:inline text-sm font-semibold">Telegram</span>
      </button>
    );
  }

  return (
    <div className="relative flex flex-col items-end gap-2">
      {showLoginMessage && (
        <div className="absolute bottom-full mb-2 rounded-lg bg-deep text-deep-foreground px-3 py-2 text-xs shadow-lg whitespace-nowrap">
          Inicia sesión para vincular Telegram
        </div>
      )}
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full bg-[#2AABEE] text-white px-4 py-3 shadow-lg hover:bg-[#229ED9] transition-colors duration-200"
        aria-label={user ? "Vincular Telegram" : "Inicia sesión para vincular Telegram"}
      >
        <TelegramIcon className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-semibold">Telegram</span>
      </button>
    </div>
  );
}

import espiral from "@/assets/logo-espiral.png.asset.json";

interface LogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export function Logo({ variant = "header", className = "" }: LogoProps) {
  const isFooter = variant === "footer";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={espiral.url}
        alt=""
        width={isFooter ? 44 : 36}
        height={isFooter ? 44 : 36}
        className={isFooter ? "h-11 w-11" : "h-9 w-9"}
      />
      <div className="flex flex-col leading-none">
        <span
          className={`font-display ${
            isFooter ? "text-2xl" : "text-xl"
          } tracking-tight`}
        >
          <span className="text-deep">Anima </span>
          <span className="text-primary-hover">Praxis</span>
        </span>
        {isFooter && (
          <span className="text-[0.7rem] text-muted-foreground mt-1 italic">
            Conciencia que transforma. Acción que enraíza.
          </span>
        )}
      </div>
    </div>
  );
}

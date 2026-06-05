import banner from "@/assets/anima-praxis-hero.png.asset.json";

interface LogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export function Logo({ variant = "header", className = "" }: LogoProps) {
  const isFooter = variant === "footer";
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={banner.url}
        alt="Anima Praxis — Conciencia que transforma. Acción que enraíza."
        width={761}
        height={314}
        className={isFooter ? "h-16 w-auto" : "h-20 w-auto max-w-[200px] sm:max-w-[280px]"}
      />
    </div>
  );
}

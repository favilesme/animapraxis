import columtrad from "@/assets/clients/columtrad.png.asset.json";
import thCompany from "@/assets/clients/th-company.png.asset.json";
import holcim from "@/assets/clients/holcim.png.asset.json";
import petrobras from "@/assets/clients/petrobras.png.asset.json";
import disensa from "@/assets/clients/disensa.png.asset.json";
import cerveceriaNacional from "@/assets/clients/cerveceria-nacional.png.asset.json";
import teciniseguros from "@/assets/clients/teciniseguros.png.asset.json";
import donDiego from "@/assets/clients/don-diego.png.asset.json";
import segurosPichincha from "@/assets/clients/seguros-pichincha.png.asset.json";

const clients = [
  { name: "Petrobras", src: petrobras.url },
  { name: "Holcim", src: holcim.url },
  { name: "Disensa", src: disensa.url },
  { name: "Cervecería Nacional", src: cerveceriaNacional.url },
  { name: "Seguros del Pichincha", src: segurosPichincha.url },
  { name: "Tecniseguros", src: teciniseguros.url },
  { name: "Alimentos Don Diego", src: donDiego.url },
  { name: "Columtrad", src: columtrad.url },
  { name: "TH Company", src: thCompany.url },
];

export function ClientsMarquee() {
  const loop = [...clients, ...clients];
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee gap-16 items-center">
        {loop.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className="shrink-0 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
          >
            <img
              src={c.src}
              alt={c.name}
              loading="lazy"
              className="h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

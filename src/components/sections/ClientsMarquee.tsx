import columtrad from "@/assets/clients/columtrad.png.asset.json";
import thCompany from "@/assets/clients/th-company.png.asset.json";
import holcim from "@/assets/clients/holcim.png.asset.json";
import petrobras from "@/assets/clients/petrobras.png.asset.json";
import disensa from "@/assets/clients/disensa.png.asset.json";
import cerveceriaNacional from "@/assets/clients/cerveceria-nacional.png.asset.json";
import teciniseguros from "@/assets/clients/teciniseguros.png.asset.json";
import donDiego from "@/assets/clients/don-diego.png.asset.json";
import segurosPichincha from "@/assets/clients/seguros-pichincha.png.asset.json";
import metropolitanTouring from "@/assets/clients/metropolitan-touring.png.asset.json";
import financoop from "@/assets/clients/financoop.png.asset.json";
import laPaz from "@/assets/clients/la-paz.png.asset.json";
import danielaOrtiz from "@/assets/clients/daniela-ortiz.png.asset.json";

const clients = [
  { name: "Petrobras", src: petrobras.url, width: 528, height: 120 },
  { name: "Holcim", src: holcim.url, width: 398, height: 106 },
  { name: "Disensa", src: disensa.url, width: 376, height: 152 },
  { name: "Cervecería Nacional", src: cerveceriaNacional.url, width: 316, height: 80 },
  { name: "Seguros del Pichincha", src: segurosPichincha.url, width: 524, height: 98 },
  { name: "Tecniseguros", src: teciniseguros.url, width: 352, height: 208 },
  { name: "Alimentos Don Diego", src: donDiego.url, width: 364, height: 232 },
  { name: "Columtrad", src: columtrad.url, width: 764, height: 202 },
  { name: "TH Company", src: thCompany.url, width: 460, height: 74 },
  { name: "Metropolitan Touring", src: metropolitanTouring.url, width: 292, height: 94 },
  { name: "Financoop", src: financoop.url, width: 596, height: 156 },
  { name: "Camposanto La Paz", src: laPaz.url, width: 446, height: 124 },
  { name: "Daniela Ortiz", src: danielaOrtiz.url, width: 446, height: 160 },
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

import { Briefcase, Brain, Users, type LucideIcon } from "lucide-react";

export type Dimension = {
  icon: LucideIcon;
  title: string;
  href: string;
  desc: string;
  items: string[];
};

export const dimensiones: Dimension[] = [
  {
    icon: Briefcase,
    title: "Consultoría Estratégica",
    href: "/consultoria-ia",
    desc: "Dimensión enfocada a la empresa, el desarrollo y fortalecimiento de su cultura organizacional, y la estructuración del mapa de dirección estratégico para alcanzar objetivos de alto impacto y asegurar resultados sostenibles.",
    items: [
      "Diagnóstico estratégico",
      "Objetivos y prioridades",
      "Indicadores de gestión",
      "Hoja de ruta",
      "Implementación y seguimiento",
    ],
  },
  {
    icon: Brain,
    title: "Coaching Ontológico",
    href: "/coaching-terapia",
    desc: "Dimensión dirigida al desarrollo y crecimiento personal y profesional de líderes, ejecutivos y adultos funcionales que requieren un acompañamiento profundo para expandir sus espacios de acción, consciencia y aprendizaje.",
    items: [
      "Coaching ejecutivo",
      "Liderazgo consciente",
      "Procesos de transición",
      "Recursos integrales cuerpo-mente",
    ],
  },
  {
    icon: Users,
    title: "Gestión del Liderazgo",
    href: "/capacitacion-corporativa",
    desc: "Dimensión enfocada en la consolidación del trabajo en equipo empresarial y el desarrollo de competencias integrales para estructurar equipos autogestionados de alto rendimiento.",
    items: [
      "Diagnóstico de necesidades de formación",
      "Diseño de modelos de aprendizaje a medida",
      "Desarrollo de competencias (Programa de habilidades directivas / Gestión de Liderazgo 360)",
      "Transferencia efectiva a la operación",
    ],
  },
];

interface FaltaProps {
  children?: React.ReactNode;
  label?: string;
}

export function Falta({ children, label }: FaltaProps) {
  return (
    <span className="falta" aria-label="Información pendiente de completar">
      [FALTA{children || label ? `: ${children ?? label}` : ""}]
    </span>
  );
}

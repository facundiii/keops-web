import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Botón de Keops.
 * - principal:  fondo oro, texto negro. Hover: oro profundo.
 * - secundario: contorno oro, texto oro.
 * - whatsapp:   fondo verde WhatsApp. Solo para ese botón.
 *
 * Con `href` se comporta como link (interno o externo); sin `href`, como <button>.
 * El foco visible para teclado sale de la regla global :focus-visible.
 */
export type VarianteBoton = "principal" | "secundario" | "whatsapp";

// Las medidas internas (28 px de relleno, 10 px entre ícono y texto) son las de la ficha del botón
// en DESIGN.md: no salen de la escala de espaciado y no se copian fuera de este componente.
const base =
  "inline-flex items-center justify-center gap-2.5 min-h-[44px] px-7 py-3 rounded-full " +
  "texto-boton text-center " +
  "transition-[color,background-color,border-color,box-shadow] duration-300 disabled:opacity-50 disabled:pointer-events-none";

// La luz al tocar: el halo dorado aparece solo en hover o foco, nunca en reposo
const variantes: Record<VarianteBoton, string> = {
  principal: "bg-oro text-negro hover:bg-oro-profundo hover:shadow-halo focus-visible:shadow-halo active:bg-oro-profundo",
  secundario: "border border-oro text-oro hover:bg-oro/10 hover:shadow-halo focus-visible:shadow-halo active:bg-oro/20",
  whatsapp: "bg-whatsapp text-negro hover:bg-whatsapp/85 active:bg-whatsapp/75",
};

export function claseBoton(variante: VarianteBoton = "principal", className = "") {
  return `${base} ${variantes[variante]} ${className}`.trim();
}

interface BotonProps {
  children: ReactNode;
  variante?: VarianteBoton;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function Boton({
  children,
  variante = "principal",
  href,
  onClick,
  type = "button",
  disabled,
  className,
  "aria-label": ariaLabel,
}: BotonProps) {
  const clase = claseBoton(variante, className);

  if (href) {
    const esExterno = /^(https?:|mailto:|tel:)/.test(href);
    if (esExterno) {
      const nuevaPestana = href.startsWith("http");
      return (
        <a
          href={href}
          className={clase}
          aria-label={ariaLabel}
          onClick={onClick}
          {...(nuevaPestana ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={clase} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={clase} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

// Fechas de la cartelera. Todas las fechas son texto "AAAA-MM-DD".

const dosDigitos = (n: number) => String(n).padStart(2, "0");
const aTexto = (d: Date) => `${d.getFullYear()}-${dosDigitos(d.getMonth() + 1)}-${dosDigitos(d.getDate())}`;

/**
 * Resume "ahora" en un texto estable: "hoy|ayer|am" o "hoy|ayer|pm".
 * Solo cambia dos veces por día, así el sitio no se redibuja de más.
 */
export function claveAhora(ahora: Date): string {
  const ayer = new Date(ahora);
  ayer.setDate(ahora.getDate() - 1);
  return `${aTexto(ahora)}|${aTexto(ayer)}|${ahora.getHours() < 12 ? "am" : "pm"}`;
}

/** Una noche sigue vigente hasta el mediodía del día siguiente a su fecha. */
export function esVigente(fecha: string, clave: string): boolean {
  const [hoy, ayer, turno] = clave.split("|");
  return fecha >= hoy || (fecha === ayer && turno === "am");
}

function partes(fecha: string): Date {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  return new Date(Date.UTC(anio, mes - 1, dia));
}

/** "2026-12-05" → "Sábado 5 de diciembre" */
export function fechaLarga(fecha: string): string {
  const texto = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  })
    .format(partes(fecha))
    .replace(",", "");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** "2026-12-05" → "Sáb 5 dic" */
export function fechaCorta(fecha: string): string {
  const texto = new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  })
    .format(partes(fecha))
    .replace(/[,.]/g, "");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

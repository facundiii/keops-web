import type { ReactNode } from "react";
import { Instagram, Mail } from "lucide-react";
import { instagram, lineas, urlWhatsApp, type InstagramId, type Linea, type LineaId } from "@/config/contacto";
import { MOSTRAR_EJEMPLOS } from "@/lib/ejemplo";
import { Boton } from "@/components/ui/Boton";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { IconoWhatsApp } from "@/components/ui/IconoWhatsApp";

interface ContactCTAProps {
  title?: string;
  subtitle?: string;
  /** Línea a la que se le escribe desde este bloque */
  linea?: LineaId;
  /** Cuenta de Instagram que se muestra */
  instagramDe?: InstagramId;
  /** Contenido extra arriba de los botones (por ejemplo, un formulario) */
  children?: ReactNode;
  /** Contacto de ejemplo: se usa solo en desarrollo, si la línea todavía no tiene datos cargados. */
  contactoDeEjemplo?: Linea;
  /** true cuando la bajada es de ejemplo (solo en desarrollo) */
  bajadaDeEjemplo?: boolean;
}

/**
 * Bloque de contacto de la página. Es el destino del botón "Contacto" del navbar (id="contacto").
 * Cada dato vacío en config/contacto.ts oculta su botón; sin ningún dato, el bloque no se muestra.
 */
export function ContactCTA({
  title = "¿Listo para reservar?",
  subtitle = "Contactanos por WhatsApp, por mail o seguinos en Instagram para no perderte ninguna novedad.",
  linea = "disco",
  instagramDe = "oficial",
  children,
  contactoDeEjemplo,
  bajadaDeEjemplo = false,
}: ContactCTAProps) {
  const real = lineas[linea];
  const hayReal = Boolean(real.whatsapp || real.mail);
  const usaEjemplo = !hayReal && MOSTRAR_EJEMPLOS && contactoDeEjemplo !== undefined;
  const datos = usaEjemplo && contactoDeEjemplo ? contactoDeEjemplo : real;
  const cuenta = instagram[instagramDe];
  const whatsapp = urlWhatsApp(datos);

  if (!whatsapp && !datos.mail) return null;

  return (
    <section id="contacto" className="bg-negro border-t border-piedra py-16 px-4 scroll-mt-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="antetitulo mb-4">Contacto</p>
        <h2 className="titulo-2 text-marfil">{title}</h2>
        {subtitle && <p className="cuerpo text-arena mt-4">{subtitle}</p>}
        {(usaEjemplo || (bajadaDeEjemplo && subtitle)) && (
          <div className="mt-4">
            <EtiquetaEjemplo texto={usaEjemplo ? "Contacto de ejemplo: no se publica" : undefined} />
          </div>
        )}

        {children && <div className="mt-10 text-left">{children}</div>}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Con formulario, el botón de WhatsApp ya está dentro del formulario */}
          {whatsapp && !children && (
            <Boton variante="whatsapp" href={whatsapp}>
              <IconoWhatsApp size={20} />
              Escribinos por WhatsApp
            </Boton>
          )}

          {datos.mail && (
            <Boton variante="secundario" href={`mailto:${datos.mail}`}>
              <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
              Escribinos por mail
            </Boton>
          )}

          <Boton variante="secundario" href={cuenta.url}>
            <Instagram size={20} strokeWidth={1.5} aria-hidden="true" />
            {cuenta.usuario}
          </Boton>
        </div>

        <div className="texto-chico mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-arena">
          {whatsapp && (
            <span className="flex items-center gap-2">
              <IconoWhatsApp size={16} />
              {datos.whatsappVisible}
            </span>
          )}
          {datos.mail && (
            <span className="flex items-center gap-2">
              <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
              {datos.mail}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

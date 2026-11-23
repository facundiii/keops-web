import { Instagram, Mail } from "lucide-react";
import { instagram, lineas, urlWhatsApp, type InstagramId, type LineaId } from "@/config/contacto";
import { Boton } from "@/components/ui/Boton";
import { IconoWhatsApp } from "@/components/ui/IconoWhatsApp";

interface ContactCTAProps {
  title?: string;
  subtitle?: string;
  /** Línea a la que se le escribe desde este bloque */
  linea?: LineaId;
  /** Cuenta de Instagram que se muestra */
  instagramDe?: InstagramId;
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
}: ContactCTAProps) {
  const datos = lineas[linea];
  const cuenta = instagram[instagramDe];
  const whatsapp = urlWhatsApp(datos);

  if (!whatsapp && !datos.mail) return null;

  return (
    <section id="contacto" className="bg-negro border-t border-piedra py-16 px-4 scroll-mt-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="antetitulo mb-4">Contacto</p>
        <h2 className="titulo-2 text-marfil mb-4">{title}</h2>
        <p className="cuerpo text-arena mb-8">{subtitle}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {whatsapp && (
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

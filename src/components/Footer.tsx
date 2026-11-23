import Link from "next/link";
import Image from "next/image";
import { CircleHelp, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { lineas, mapa, urlWhatsApp } from "@/config/contacto";
import { hayPreguntas } from "@/config/faq";
import { RUTA_INICIO } from "@/config/navegacion";
import { IconoWhatsApp } from "@/components/ui/IconoWhatsApp";
import { InstagramDePagina } from "@/components/InstagramDePagina";

const claseLink =
  "inline-flex items-center gap-2.5 min-h-[44px] text-marfil hover:text-oro transition-colors duration-200";

export function Footer() {
  const year = new Date().getFullYear();
  // Solo las líneas que tienen algún dato de contacto cargado
  const lineasConContacto = Object.values(lineas).filter((l) => l.whatsapp || l.mail);

  return (
    <footer id="pie" className="bg-negro border-t border-piedra scroll-mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
          <Link href={RUTA_INICIO} aria-label="Keops, ir al inicio" className="block w-36 shrink-0">
            <Image src="/logo.png" alt="Keops" width={288} height={119} className="w-full h-auto" />
          </Link>

          {/* Contacto de cada línea */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {lineasConContacto.map((linea) => (
              <div key={linea.nombre}>
                <p className="antetitulo mb-2">{linea.nombre}</p>
                <ul className="cuerpo">
                  {linea.whatsapp && (
                    <li>
                      <a
                        href={urlWhatsApp(linea)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={claseLink}
                      >
                        <IconoWhatsApp size={20} />
                        <span>
                          <span className="sr-only">WhatsApp: </span>
                          {linea.whatsappVisible}
                        </span>
                      </a>
                    </li>
                  )}
                  {linea.mail && (
                    <li>
                      <a href={`mailto:${linea.mail}`} className={claseLink}>
                        <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                        {linea.mail}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram, mapa y preguntas frecuentes */}
        <div className="cuerpo mt-10 pt-6 border-t border-piedra flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-10">
          <InstagramDePagina className={claseLink} />
          <a href={mapa.url} target="_blank" rel="noopener noreferrer" className={claseLink}>
            <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
            Ver en Google Maps
          </a>
          {hayPreguntas() && (
            <Link href="/preguntas-frecuentes" className={claseLink}>
              <CircleHelp size={20} strokeWidth={1.5} aria-hidden="true" />
              Preguntas frecuentes
            </Link>
          )}
        </div>

        <div className="texto-chico mt-8 text-arena">
          <p>
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p className="mt-1">
            Diseñado y desarrollado por{" "}
            <a
              href="mailto:facufergoye@gmail.com"
              className="underline underline-offset-4 decoration-piedra hover:text-marfil transition-colors duration-200"
            >
              Facundo Fernandez Goyechea
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import { textoSinFechas } from "@/config/cartelera";
import { instagram } from "@/config/contacto";

/** Aviso cuando no hay noches para mostrar, con el Instagram oficial. */
export function SinFechas({ texto = textoSinFechas, conInstagram = true }: { texto?: string; conInstagram?: boolean }) {
  return (
    <p className="cuerpo text-arena">
      {texto}
      {conInstagram && (
        <>
          {" "}
          <a
            href={instagram.oficial.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-oro underline underline-offset-4 hover:text-oro-profundo transition-colors duration-200"
          >
            {instagram.oficial.usuario}
          </a>
          .
        </>
      )}
    </p>
  );
}

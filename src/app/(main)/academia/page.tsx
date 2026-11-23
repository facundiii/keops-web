import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { academia } from "@/config/academia";
import { lineas } from "@/config/contacto";
import { fotos } from "@/config/fotos";
import { ejemplos } from "@/config/ejemplos";
import { MOSTRAR_EJEMPLOS, galeriaDeEjemplo, listaConEjemplo, textoConEjemplo } from "@/lib/ejemplo";
import { Encabezado } from "@/components/Encabezado";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { BloqueGaleria } from "@/components/BloqueGaleria";
import { BloqueFaq } from "@/components/BloqueFaq";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: academia.meta.titulo,
  description: academia.meta.descripcion,
};

export default function AcademiaPage() {
  const { encabezado, modalidad, galeria, inscripcion } = academia;

  // Donde falta el dato real, en desarrollo se muestra uno de ejemplo.
  const bajada = textoConEjemplo(encabezado.bajada, ejemplos.academia.bajada);
  const temas = listaConEjemplo(academia.temas.lista, ejemplos.academia.temas);
  const docentes = listaConEjemplo(academia.docentes.lista, ejemplos.academia.docentes);
  const bajadaInscripcion = textoConEjemplo(inscripcion.bajada, ejemplos.academia.inscripcionBajada);

  const modalidadReal = [modalidad.duracion, modalidad.diasYHorarios, modalidad.cupos, modalidad.requisitos];
  const modalidadEsEjemplo = MOSTRAR_EJEMPLOS && modalidadReal.every((v) => v.trim() === "");
  const m = modalidadEsEjemplo ? ejemplos.academia.modalidad : modalidad;
  const datosModalidad = [
    { etiqueta: "Duración", valor: m.duracion },
    { etiqueta: "Días y horarios", valor: m.diasYHorarios },
    { etiqueta: "Cupos", valor: m.cupos },
    { etiqueta: "Requisitos", valor: m.requisitos },
  ].filter((d) => d.valor.trim() !== "");

  const hayContacto = Boolean(lineas.academia.whatsapp || lineas.academia.mail) || MOSTRAR_EJEMPLOS;
  const foto = fotos.academia.encabezado;

  return (
    <>
      {/* 1. Encabezado */}
      <Encabezado
        antetitulo={encabezado.antetitulo}
        titulo={encabezado.titulo}
        bajada={bajada.texto}
        bajadaDeEjemplo={bajada.esEjemplo}
        boton={hayContacto ? "Inscribite" : undefined}
        foto={foto?.src}
        fotoAlt={foto?.alt}
        fotoPosicion={foto?.posicion}
      />

      {/* 2. Qué vas a aprender */}
      {temas.datos.length > 0 && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion titulo={academia.temas.titulo} className={temas.esEjemplo ? "!mb-5" : ""} />
            {temas.esEjemplo && <EtiquetaEjemplo className="mb-8" />}
          </FadeInSection>
          <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {temas.datos.map((tema, i) => (
              <li key={tema}>
                <FadeInSection delay={i * 60}>
                  <span className="cuerpo text-marfil flex items-start gap-3">
                    <Check size={24} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-oro mt-0.5" />
                    {tema}
                  </span>
                </FadeInSection>
              </li>
            ))}
          </ul>
        </Seccion>
      )}

      {/* 3. Modalidad */}
      {datosModalidad.length > 0 && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion titulo={modalidad.titulo} className={modalidadEsEjemplo ? "!mb-5" : ""} />
            {modalidadEsEjemplo && <EtiquetaEjemplo className="mb-8" />}
          </FadeInSection>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {datosModalidad.map((dato) => (
              <div key={dato.etiqueta} className="rounded-2xl border border-piedra bg-carbon p-6">
                <dt className="antetitulo mb-3">{dato.etiqueta}</dt>
                <dd className="cuerpo text-marfil">{dato.valor}</dd>
              </div>
            ))}
          </dl>
        </Seccion>
      )}

      {/* 4. Docentes (opcional) */}
      {docentes.datos.length > 0 && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion titulo={academia.docentes.titulo} className={docentes.esEjemplo ? "!mb-5" : ""} />
            {docentes.esEjemplo && <EtiquetaEjemplo className="mb-8" />}
          </FadeInSection>
          <ul className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {docentes.datos.map((docente) => (
              <li key={docente.nombre} className="rounded-2xl border border-piedra bg-carbon overflow-hidden">
                {docente.foto && (
                  <div className="relative aspect-square">
                    <Image
                      src={docente.foto}
                      alt={`${docente.nombre}, ${docente.rol}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5 lg:p-6">
                  <h3 className="titulo-3 text-marfil">{docente.nombre}</h3>
                  {docente.rol && <p className="antetitulo mt-2">{docente.rol}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Seccion>
      )}

      {/* Galería: en el sitio publicado, oculta hasta tener 6 fotos o un video */}
      <BloqueGaleria titulo={galeria.titulo} medios={galeria.medios} ejemplo={galeriaDeEjemplo()} />

      <BloqueFaq grupo="academia" />

      {/* 5. Inscripción: WhatsApp y mail de la academia */}
      <ContactCTA
        title={inscripcion.titulo}
        subtitle={bajadaInscripcion.texto}
        bajadaDeEjemplo={bajadaInscripcion.esEjemplo}
        linea="academia"
        contactoDeEjemplo={ejemplos.academia.contacto}
      />
    </>
  );
}

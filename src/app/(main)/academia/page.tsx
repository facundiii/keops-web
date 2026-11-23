import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { academia } from "@/config/academia";
import { lineas } from "@/config/contacto";
import { Encabezado } from "@/components/Encabezado";
import { Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ContactCTA } from "@/components/ContactCTA";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: academia.meta.titulo,
  description: academia.meta.descripcion,
};

export default function AcademiaPage() {
  const { encabezado, temas, modalidad, docentes, inscripcion } = academia;

  const datosModalidad = [
    { etiqueta: "Duración", valor: modalidad.duracion },
    { etiqueta: "Días y horarios", valor: modalidad.diasYHorarios },
    { etiqueta: "Cupos", valor: modalidad.cupos },
    { etiqueta: "Requisitos", valor: modalidad.requisitos },
  ].filter((d) => d.valor.trim() !== "");

  const hayContacto = Boolean(lineas.academia.whatsapp || lineas.academia.mail);

  return (
    <>
      {/* 1. Encabezado */}
      <Encabezado
        antetitulo={encabezado.antetitulo}
        titulo={encabezado.titulo}
        bajada={encabezado.bajada}
        boton={hayContacto ? "Inscribite" : undefined}
      />

      {/* 2. Qué vas a aprender */}
      {temas.lista.length > 0 && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion titulo={temas.titulo} />
          </FadeInSection>
          <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {temas.lista.map((tema, i) => (
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
            <TituloSeccion titulo={modalidad.titulo} />
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
      {docentes.lista.length > 0 && (
        <Seccion>
          <FadeInSection>
            <TituloSeccion titulo={docentes.titulo} />
          </FadeInSection>
          <ul className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {docentes.lista.map((docente) => (
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

      {/* 5. Inscripción: WhatsApp y mail de la academia */}
      <ContactCTA title={inscripcion.titulo} subtitle={inscripcion.bajada} linea="academia" />
    </>
  );
}

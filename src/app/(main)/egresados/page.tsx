import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { egresados } from "@/config/lineas";
import { fotos, portadas } from "@/config/fotos";
import { Encabezado } from "@/components/Encabezado";
import { BloqueArgumentos } from "@/components/BloqueArgumentos";
import { BloqueFaq } from "@/components/BloqueFaq";
import { Seccion } from "@/components/ui/Seccion";
import { ContactCTA } from "@/components/ContactCTA";
import { FormularioAgencia } from "@/components/FormularioAgencia";
import { FadeInSection } from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: egresados.meta.titulo,
  description: egresados.meta.descripcion,
};

export default function EgresadosPage() {
  const { encabezado, niveles, porQue, contacto } = egresados;

  return (
    <>
      <Encabezado
        antetitulo={encabezado.antetitulo}
        titulo={encabezado.titulo}
        bajada={encabezado.bajada}
        video={portadas.egresados}
      />

      {/* Elección de nivel */}
      <Seccion>
        <h2 className="sr-only">Elegí el nivel</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {niveles.map((nivel, i) => (
            <FadeInSection key={nivel.href} delay={i * 100} className="h-full">
              <Link
                href={nivel.href}
                className="group flex h-full min-h-[220px] flex-col justify-between rounded-2xl border border-piedra bg-carbon p-8 lg:p-10 transition-[border-color,box-shadow] duration-300 hover:border-oro hover:shadow-halo focus-visible:border-oro focus-visible:shadow-halo"
              >
                <div>
                  <h3 className="titulo-2 text-marfil">{nivel.titulo}</h3>
                  {nivel.texto && <p className="cuerpo mt-3 text-arena">{nivel.texto}</p>}
                </div>
                <span className="mt-8 inline-flex items-center gap-2 texto-boton text-oro">
                  {nivel.boton}
                  <ArrowRight
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </Seccion>

      <BloqueArgumentos titulo={porQue.titulo} argumentos={porQue.argumentos} foto={fotos.egresados.porQue} />

      <BloqueFaq grupo="egresados" />

      <ContactCTA title={contacto.titulo} subtitle={contacto.bajada} linea="egresados">
        <FormularioAgencia />
      </ContactCTA>
    </>
  );
}

import { aniversario } from "@/config/aniversario";
import { Boton } from "@/components/ui/Boton";
import { FadeInSection } from "@/components/FadeInSection";
import { ANCLA_ENTRADAS } from "@/components/EnlaceEntrada";

/**
 * La banda que sigue a la portada del aniversario, como la última línea del flyer:
 * la luz del fuego entra desde arriba y abajo va el botón de compra.
 * Sin link propio de la noche, "Comprar entrada" lleva a "Comprá tu entrada" en Disco.
 */
export function BandaAniversario() {
  const { banda } = aniversario;
  const href = banda.urlEntradas.trim() || `/disco#${ANCLA_ENTRADAS}`;
  const detalle = [banda.hora.trim() && `Apertura ${banda.hora.trim()} h`, banda.nota].filter(Boolean).join(" · ");

  return (
    <section className="aniv-banda relative overflow-hidden px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
      <FadeInSection>
        <div className="mx-auto max-w-2xl">
          <h2 className="titulo-2 text-marfil">{banda.titulo}</h2>
          {banda.bajada && <p className="cuerpo mt-4 text-arena">{banda.bajada}</p>}
          <div className="mt-8">
            <Boton href={href}>{banda.boton}</Boton>
          </div>
          {detalle && <p className="texto-chico mt-4 text-arena">{detalle}</p>}
        </div>
      </FadeInSection>
    </section>
  );
}

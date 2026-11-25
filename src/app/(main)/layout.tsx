import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFlotante } from "@/components/WhatsAppFlotante";
import { hayPreguntasVisibles } from "@/lib/faq";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Se resuelve acá, en el servidor: el navbar corre en el navegador y no tiene que cargar las preguntas */}
      <Navbar conPreguntas={hayPreguntasVisibles()} />
      <main>{children}</main>
      <Footer />
      <WhatsAppFlotante />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown, Menu, X } from "lucide-react";
import { navegacion, navFusion, RUTA_INICIO } from "@/config/navegacion";
import { claseBoton } from "@/components/ui/Boton";
import { usePasoPortada } from "@/lib/usePasoPortada";

const claseLink = "enlace-menu whitespace-nowrap transition-colors duration-200 hover:text-oro";
/** "Contacto" en texto: así se ve mientras dura la primera vista de la home, que va sin botones. */
const claseContactoTexto =
  "inline-flex min-h-[44px] items-center texto-boton text-oro transition-colors duration-200 hover:text-marfil";

export function Navbar() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [arriba, setArriba] = useState(true);
  const ultimoY = useRef(0);

  const esInicio = ruta === RUTA_INICIO || ruta === "/";
  const activo = (href: string) => ruta === href || ruta.startsWith(href + "/");
  // La primera vista de ninguna página lleva botones: "Contacto" va en texto hasta que se baja
  const pasoPortada = usePasoPortada();
  const contactoEnTexto = !pasoPortada;

  // Se oculta al bajar y reaparece apenas se sube o se vuelve al tope.
  useEffect(() => {
    ultimoY.current = window.scrollY;
    const alScroll = () => {
      const y = window.scrollY;
      setArriba(y < 20);
      if (y < 80) {
        setOculto(false);
        ultimoY.current = y;
        return;
      }
      const delta = y - ultimoY.current;
      if (Math.abs(delta) < 6) return;
      setOculto(delta > 0);
      ultimoY.current = y;
    };
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  // Menú de celular: bloquea el scroll de fondo y se cierra con Escape.
  useEffect(() => {
    if (!abierto) return;
    document.body.style.overflow = "hidden";
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", alTeclear);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", alTeclear);
    };
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  // "Contacto" lleva al bloque de contacto de la página actual (o al pie, si no hay).
  const irAContacto = (e: React.MouseEvent) => {
    e.preventDefault();
    setAbierto(false);
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      const destino = document.getElementById("contacto") ?? document.getElementById("pie");
      destino?.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
    }, 60);
  };

  return (
    <>
      <header
        // has-[:focus-visible]: si alguien navega con teclado, el navbar no se esconde.
        // (No se usa focus-within: después de un clic el foco queda en el link y el navbar no se ocultaría nunca.)
        className={`fixed top-0 inset-x-0 z-50 border-b px-4 sm:px-6 lg:px-8 transition-[transform,background-color,border-color] duration-300 has-[:focus-visible]:translate-y-0 ${
          oculto && !abierto ? "-translate-y-full" : "translate-y-0"
        } ${
          abierto
            ? "bg-negro border-piedra"
            : arriba
              ? "bg-transparent border-transparent"
              : "bg-negro/95 backdrop-blur-md border-piedra"
        }`}
      >
        {/* Sobre la misma línea que el contenido: el ancho de siempre, con los márgenes de <Seccion> en el <header> */}
        <div className="relative max-w-6xl mx-auto h-16 lg:h-20 flex items-center justify-between gap-6">
          {/* Celular, páginas internas: volver a la home */}
          {!esInicio && (
            <Link
              href={RUTA_INICIO}
              onClick={cerrar}
              className="lg:hidden inline-flex items-center gap-2 min-h-[44px] min-w-[44px] -ml-1 pr-3 font-sans font-medium text-base text-marfil hover:text-oro transition-colors duration-200"
            >
              <ArrowLeft size={24} strokeWidth={1.5} aria-hidden="true" />
              Inicio
            </Link>
          )}

          {/* Isotipo: el triángulo solo. Centrado en celular cuando está la flecha. */}
          <Link
            href={RUTA_INICIO}
            onClick={cerrar}
            aria-label="Keops, ir al inicio"
            className={`isotipo group flex items-center justify-center min-h-[44px] min-w-[44px] ${
              esInicio ? "" : "absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            }`}
          >
            <Image
              src="/logo-piramide.png"
              alt=""
              width={281}
              height={209}
              className="isotipo-luz w-12 lg:w-16 h-auto"
              priority
            />
          </Link>

          {/* Menú de escritorio */}
          <nav aria-label="Principal" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navegacion.map((item) =>
              item.hijos ? (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    aria-current={ruta === item.href ? "page" : undefined}
                    className={`${claseLink} inline-flex items-center gap-1 py-2 ${
                      activo(item.href) ? "text-oro" : "text-marfil"
                    }`}
                  >
                    {item.etiqueta}
                    <ChevronDown
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 invisible opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="min-w-[200px] rounded-xl border border-piedra bg-carbon p-2">
                      {item.hijos.map((hijo) => (
                        <li key={hijo.href}>
                          <Link
                            href={hijo.href}
                            aria-current={ruta === hijo.href ? "page" : undefined}
                            className={`${claseLink} block rounded-lg px-4 py-3 hover:bg-piedra ${
                              ruta === hijo.href ? "text-oro" : "text-marfil"
                            }`}
                          >
                            {hijo.etiqueta}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={ruta === item.href ? "page" : undefined}
                  className={`${claseLink} py-2 ${activo(item.href) ? "text-oro" : "text-marfil"}`}
                >
                  {item.etiqueta}
                </Link>
              )
            )}

            <span aria-hidden="true" className="h-5 w-px bg-piedra" />

            <Link
              href={navFusion.href}
              aria-current={ruta === navFusion.href ? "page" : undefined}
              className={`${claseLink} py-2 ${activo(navFusion.href) ? "text-oro" : "text-marfil"}`}
            >
              {navFusion.etiqueta}
            </Link>

            <a
              href="#contacto"
              onClick={irAContacto}
              className={contactoEnTexto ? claseContactoTexto : claseBoton("principal", "px-6")}
            >
              Contacto
            </a>
          </nav>

          {/* Botón del menú en celular */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-11 h-11 -mr-2 text-marfil hover:text-oro transition-colors duration-200"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-celular"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          >
            {abierto ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Menú a pantalla completa en celular */}
      <div
        id="menu-celular"
        className={`lg:hidden fixed inset-0 z-40 bg-negro pt-16 overflow-y-auto transition-opacity duration-300 ${
          abierto ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Principal" className="min-h-full flex flex-col px-6 pt-6 pb-8">
          <ul className="flex flex-col">
            {navegacion.map((item) => (
              <li key={item.href} className="border-b border-piedra">
                <Link
                  href={item.href}
                  onClick={cerrar}
                  aria-current={ruta === item.href ? "page" : undefined}
                  className={`titulo-3 flex items-center min-h-[56px] ${
                    ruta === item.href ? "text-oro" : "text-marfil"
                  }`}
                >
                  {item.etiqueta}
                </Link>
                {item.hijos && (
                  <ul className="pb-3 -mt-1">
                    {item.hijos.map((hijo) => (
                      <li key={hijo.href}>
                        <Link
                          href={hijo.href}
                          onClick={cerrar}
                          aria-current={ruta === hijo.href ? "page" : undefined}
                          className={`cuerpo flex items-center min-h-[44px] pl-4 ${
                            ruta === hijo.href ? "text-oro" : "text-arena"
                          }`}
                        >
                          {hijo.etiqueta}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link
                href={navFusion.href}
                onClick={cerrar}
                aria-current={ruta === navFusion.href ? "page" : undefined}
                className={`titulo-3 flex items-center min-h-[56px] ${
                  ruta === navFusion.href ? "text-oro" : "text-marfil"
                }`}
              >
                {navFusion.etiqueta}
              </Link>
            </li>
          </ul>

          <div className="mt-auto pt-8">
            <a href="#contacto" onClick={irAContacto} className={claseBoton("principal", "w-full")}>
              Contacto
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

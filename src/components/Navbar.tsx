"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-night-950/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/home" className="flex items-center group" onClick={() => setIsOpen(false)}>
            <div className="relative w-40 md:w-52 aspect-[1080/445]">
              <Image
                src="/logo.png"
                alt="Keops"
                fill
                className="object-contain transition-opacity duration-200 group-hover:opacity-80"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-widest uppercase text-white/70 hover:text-gold transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}

            {/* Fusion logo button */}
            <Link
              href={siteConfig.fusion.href}
              onClick={() => setIsOpen(false)}
              className="relative h-16 w-48 flex items-center"
              aria-label="Fusion"
            >
              <Image
                src={siteConfig.fusion.logoSrc}
                alt="Fusion"
                fill
                className="object-contain fusion-glow"
              />
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-gold transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-night-950/98 backdrop-blur-md border-t border-white/5 px-4 py-2 flex flex-col">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="py-3 px-2 text-sm tracking-widest uppercase text-white/70 hover:text-gold border-b border-white/5 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          {/* Fusion logo en mobile */}
          <Link
            href={siteConfig.fusion.href}
            onClick={() => setIsOpen(false)}
            className="py-3 px-2 flex items-center border-b border-white/5"
            aria-label="Fusion"
          >
            <Image
              src={siteConfig.fusion.logoSrc}
              alt="Fusion"
              width={120}
              height={20}
              className="h-[34px] w-auto fusion-glow"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}

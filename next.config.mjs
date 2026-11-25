import { networkInterfaces } from "node:os";

// Para mirar el sitio de desarrollo desde el celular (http://<IP de esta PC>:3000).
// Next bloquea sus scripts de desarrollo para cualquier origen que no sea localhost. Sin esos scripts
// la página carga, pero lo que se arma en el navegador no aparece: la cartelera, las próximas noches
// y las noches de Fusion quedan vacías. Acá se habilitan solo las direcciones de esta PC en la red local.
// Vale únicamente para `npm run dev`: el sitio publicado no usa esta opción.
const direccionesDeEstaPc = Object.values(networkInterfaces())
  .flat()
  .filter((red) => red && red.family === "IPv4" && !red.internal)
  .map((red) => red.address);

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: direccionesDeEstaPc,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // La home vivía en /home cuando existía la pantalla de entrada.
      { source: "/home", destination: "/", permanent: true },
      // Institucionales se sumó a Eventos privados.
      { source: "/institucionales", destination: "/eventos", permanent: true },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
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

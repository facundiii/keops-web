/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // La home vivía en /home cuando existía la pantalla de entrada.
  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  // Adicionar configuração de output para melhorar a compatibilidade com Vercel
  output: "standalone",
  // Garantir que o trailingSlash seja consistente
  trailingSlash: false,
}

module.exports = nextConfig

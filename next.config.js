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
    domains: ["localhost", "your-supabase-url.supabase.co"],
    unoptimized: true,
  },
  // Remover configurações que podem causar problemas
  experimental: {
    // Desativar recursos experimentais que podem causar problemas
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rotas protegidas que requerem autenticação
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/event/team",
    "/event/submission",
    "/event/certificate",
  ]

  // Rotas que requerem permissão de administrador
  const adminRoutes = ["/admin"]

  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Redirecionar para login se tentar acessar rota protegida sem estar autenticado
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/auth/login", req.url)
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Verificar se o usuário é administrador para rotas de admin
  if (isAdminRoute) {
    if (!session) {
      const redirectUrl = new URL("/auth/login", req.url)
      redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    const userRole = session.user?.user_metadata?.role
    if (userRole !== "admin") {
      // Redirecionar para dashboard se não for admin
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // Redirecionar para dashboard se tentar acessar login/registro já estando autenticado
  if (
    (req.nextUrl.pathname.startsWith("/auth/login") || req.nextUrl.pathname.startsWith("/auth/register")) &&
    session
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/auth/:path*",
    "/event/team/:path*",
    "/event/submission/:path*",
    "/event/certificate/:path*",
    "/admin/:path*",
  ],
}

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  try {
    // Cria uma resposta que pode ser modificada
    const res = NextResponse.next()

    // Cria o cliente Supabase usando o request e response
    const supabase = createMiddlewareClient({ req: request, res })

    // Obtém a sessão atual
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Verifica se a rota atual requer autenticação
    const requiresAuth =
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/settings") ||
      request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/event/team") ||
      request.nextUrl.pathname.startsWith("/event/submission") ||
      request.nextUrl.pathname.startsWith("/event/certificate")

    // Se não houver sessão e a rota requer autenticação
    if (!session && requiresAuth) {
      const redirectUrl = new URL("/auth/login", request.url)
      redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Se houver sessão e a rota é de autenticação
    if (
      session &&
      (request.nextUrl.pathname.startsWith("/auth/login") || request.nextUrl.pathname.startsWith("/auth/register"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Verificar se o usuário é admin para rotas /admin
    if (session && request.nextUrl.pathname.startsWith("/admin")) {
      const userRole = session.user?.user_metadata?.role

      // Se não for admin, redireciona para o dashboard
      if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    return res
  } catch (error) {
    console.error("Erro no middleware:", error)
    // Em caso de erro, permitir que a requisição continue
    return NextResponse.next()
  }
}

// Configuração do matcher para aplicar o middleware apenas nas rotas especificadas
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/auth/login",
    "/auth/register",
    "/event/team/:path*",
    "/event/submission/:path*",
    "/event/certificate/:path*",
  ],
}

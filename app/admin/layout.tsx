"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Users, BarChart3, Settings, Calendar, LogOut, Home } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está autenticado e é admin
    if (!user) {
      router.push("/auth/login")
      return
    }

    const userRole = user.user_metadata?.role
    if (userRole !== "admin") {
      router.push("/dashboard")
      return
    }

    setIsLoading(false)
  }, [user, router])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center py-4">
            <h1 className="text-xl font-bold">HackingTorch Admin</h1>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/users">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Usuários</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/events">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Eventos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/admin/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Navegação</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Voltar ao Site</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <SidebarMenuButton onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-6 md:ml-64">{children}</main>
      </SidebarProvider>
    </div>
  )
}

import type React from "react"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"

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
import { Toaster } from "@/components/ui/toaster"
import { Users, BarChart3, Settings, Calendar, LogOut } from "lucide-react"
import Link from "next/link"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verificar se o usuário é administrador
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  const userRole = session.user?.user_metadata?.role
  if (userRole !== "admin") {
    redirect("/dashboard")
  }

  const handleSignOut = async () => {
    "use server"
    const supabase = createServerSupabaseClient()
    await supabase.auth.signOut()
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
          </SidebarContent>

          <SidebarFooter className="p-4">
            <form action={handleSignOut}>
              <SidebarMenuButton className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </SidebarMenuButton>
            </form>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-6 md:ml-64">
          <Suspense fallback={<div>Carregando...</div>}>{children}</Suspense>
        </main>
      </SidebarProvider>
      <Toaster />
    </div>
  )
}

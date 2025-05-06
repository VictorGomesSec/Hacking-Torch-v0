"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { isAdmin } from "@/lib/services/admin-service"

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!loading && user) {
        const adminStatus = await isAdmin(user.id)
        setIsAuthorized(adminStatus)
      } else if (!loading && !user) {
        router.push("/auth/login")
      }
      setIsChecking(false)
    }

    checkAdminStatus()
  }, [user, loading, router])

  if (loading || isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-4 text-center">
        <h1 className="text-3xl font-bold">Acesso Restrito</h1>
        <p className="max-w-md text-muted-foreground">
          Você não tem permissão para acessar esta área. Esta seção é restrita a administradores da plataforma.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Voltar para o Dashboard
        </button>
      </div>
    )
  }

  return <>{children}</>
}

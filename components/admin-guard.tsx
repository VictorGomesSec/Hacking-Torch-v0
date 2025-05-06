"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/auth/login")
      } else {
        const userRole = user.user_metadata?.role
        if (userRole !== "admin") {
          router.push("/dashboard")
        } else {
          setIsAuthorized(true)
        }
      }
    }
  }, [user, isLoading, router])

  if (isLoading || !isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Verificando permissões...</p>
      </div>
    )
  }

  return <>{children}</>
}

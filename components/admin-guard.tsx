"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase/client"

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

        if (error) {
          console.error("Erro ao verificar status de admin:", error)
          setIsAdmin(false)
        } else {
          setIsAdmin(data?.role === "admin")
        }
      } catch (error) {
        console.error("Erro ao verificar status de admin:", error)
        setIsAdmin(false)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      checkAdminStatus()
    } else if (!loading) {
      setIsLoading(false)
    }
  }, [user, loading])

  useEffect(() => {
    if (isClient && !isLoading && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isClient, isLoading, isAdmin, router])

  if (loading || isLoading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return <>{children}</>
}

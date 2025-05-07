"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Session, User, AuthError } from "@supabase/supabase-js"
import { getSupabaseClient } from "@/lib/supabase/client"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | Error | null }>
  signUp: (
    email: string,
    password: string,
    userData: Record<string, any>,
  ) => Promise<{ error: AuthError | Error | null; user: User | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: AuthError | Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Usar a mesma instância do cliente Supabase em todo o componente
  const supabase = getSupabaseClient()

  useEffect(() => {
    const getSession = async () => {
      try {
        setIsLoading(true)
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Erro ao obter sessão:", error)
        }

        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Erro inesperado ao obter sessão:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Erro ao configurar listener de autenticação:", error)
      return () => {}
    }
  }, [supabase.auth])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error) {
        router.refresh()
      }
      return { error }
    } catch (error) {
      console.error("Erro no login:", error)
      return { error: error instanceof Error ? error : new Error("Erro desconhecido no login") }
    }
  }

  const signUp = async (email: string, password: string, userData: Record<string, any>) => {
    try {
      console.log("Iniciando registro com:", { email, userData })

      // Verificar se as variáveis de ambiente estão definidas
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error("Variáveis de ambiente do Supabase não estão definidas")
        return {
          error: new Error("Configuração do Supabase incompleta. Contate o administrador."),
          user: null,
        }
      }

      // Usar a mesma instância do cliente Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      console.log("Resposta do registro:", { data, error })

      if (error) {
        console.error("Erro retornado pelo Supabase:", error)
      }

      return { error, user: data?.user || null }
    } catch (error) {
      console.error("Erro ao registrar:", error)
      return {
        error: error instanceof Error ? error : new Error("Erro desconhecido no registro"),
        user: null,
      }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/auth/login")
      router.refresh()
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      return { error }
    } catch (error) {
      console.error("Erro ao resetar senha:", error)
      return {
        error: error instanceof Error ? error : new Error("Erro desconhecido ao resetar senha"),
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

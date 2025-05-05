"use client"

import type React from "react"
import type { User, Session, AuthError } from "@supabase/supabase-js"

import { useRouter } from "next/navigation"
import { useState, useEffect, createContext, useContext } from "react"
import { supabase } from "@/lib/supabase/client"

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (
    email: string,
    password: string,
    userData: Record<string, any>,
  ) => Promise<{ error: AuthError | null; user: User | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar sessão atual
    const getSession = async () => {
      try {
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
        setLoading(false)
      }
    }

    getSession()

    // Configurar listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error }
    } catch (err) {
      console.error("Erro inesperado ao fazer login:", err)
      return { error: { message: "Ocorreu um erro inesperado ao fazer login" } as AuthError }
    }
  }

  const signUp = async (email: string, password: string, userData: Record<string, any>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (!error && data.user) {
        // Criar perfil do usuário
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          user_type: userData.user_type,
          email: email,
        })

        if (profileError) {
          console.error("Erro ao criar perfil:", profileError)
        }
      }

      return { error, user: data.user }
    } catch (err) {
      console.error("Erro inesperado ao criar conta:", err)
      return {
        error: { message: "Ocorreu um erro inesperado ao criar conta" } as AuthError,
        user: null,
      }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      return { error }
    } catch (err) {
      console.error("Erro inesperado ao resetar senha:", err)
      return { error: { message: "Ocorreu um erro inesperado ao resetar senha" } as AuthError }
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Export nomeado que estava faltando
export const supabase = createSupabaseClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

// Cria uma instância do cliente Supabase para componentes do lado do cliente
export const createClient = () => {
  return createClientComponentClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
}

// Singleton para evitar múltiplas instâncias
let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClientComponentClient<Database>({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })
  }
  return supabaseClient
}

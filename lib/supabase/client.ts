"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

// Singleton para o cliente Supabase
let supabaseInstance: ReturnType<typeof createClientComponentClient<Database>> | null = null

// Função para obter o cliente Supabase
export function supabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClientComponentClient<Database>()
  }
  return supabaseInstance
}

// Para compatibilidade com código existente
export const createClientSupabaseClient = () => {
  return createClientComponentClient<Database>()
}

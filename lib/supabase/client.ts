"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

// Exportar o cliente do Supabase para uso em componentes do cliente
export const createClientSupabaseClient = () => {
  return createClientComponentClient<Database>()
}

// Exportar uma instância do cliente para uso direto
export const supabase = createClientComponentClient<Database>()

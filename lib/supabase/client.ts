"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

// Exportar o cliente do Supabase para uso em componentes do cliente
export const supabase = createClientComponentClient<Database>()

// Função para criar um novo cliente Supabase no cliente
export function createClientSupabaseClient() {
  return createClientComponentClient<Database>()
}

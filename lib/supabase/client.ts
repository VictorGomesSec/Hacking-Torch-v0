"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Exportar o cliente do Supabase para uso em componentes do cliente
export const supabase = createClientComponentClient<Database>()

// Função alternativa para criar um cliente Supabase
export const createSupabaseClient = () => {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Esta função só deve ser usada em componentes do servidor no diretório app/
export const createServerSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies })
}

// Versão alternativa que não usa next/headers para uso em páginas
export const createServerClient = (cookieStore: any) => {
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}

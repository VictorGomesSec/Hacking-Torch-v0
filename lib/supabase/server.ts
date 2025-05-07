import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Função para criar um cliente Supabase no servidor sem depender de cookies
export function createServerClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Função para criar um cliente Supabase no servidor com cookies passados como parâmetro
export function createServerSupabaseClient(cookieStore?: {
  get: (name: string) => { value: string } | undefined
}) {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: cookieStore
      ? {
          get(name: string) {
            return cookieStore?.get(name)?.value
          },
        }
      : undefined,
  })
}

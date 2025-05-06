import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Esta função usa cookies() e só deve ser usada em Server Components
export function createServerSupabaseClient() {
  return createServerComponentClient<Database>({ cookies })
}

// Esta função não usa cookies() e pode ser usada em qualquer contexto
export function createServerClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Esta função usa cookies() e só deve ser usada em Server Components
export function createServerSupabaseClient() {
  return createServerComponentClient<Database>({ cookies })
}

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Esta função só deve ser usada em Server Components dentro da pasta app/
export function getServerSupabaseClient() {
  return createServerComponentClient<Database>({ cookies })
}

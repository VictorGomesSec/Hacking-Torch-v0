import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Esta função só deve ser usada em componentes do servidor no diretório app/
export const createServerComponentSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies })
}

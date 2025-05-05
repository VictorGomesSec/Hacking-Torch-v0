import { supabase } from "@/lib/supabase/client"
import { createServerClient } from "@/lib/supabase/server"

export type Profile = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  bio?: string
  website?: string
  avatar_url?: string
  user_type: "participant" | "organizer"
  created_at: string
  updated_at: string
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Erro ao buscar perfil:", error)
    return null
  }

  return data
}

export async function updateProfile(userId: string, profileData: Partial<Profile>) {
  const { data, error } = await supabase.from("profiles").update(profileData).eq("id", userId).select().single()

  return { profile: data, error }
}

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { error: uploadError } = await supabase.storage.from("profiles").upload(filePath, file)

  if (uploadError) {
    console.error("Erro ao fazer upload do avatar:", uploadError)
    return { error: uploadError }
  }

  const { data: urlData } = supabase.storage.from("profiles").getPublicUrl(filePath)

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: urlData.publicUrl })
    .eq("id", userId)

  if (updateError) {
    console.error("Erro ao atualizar avatar no perfil:", updateError)
    return { error: updateError }
  }

  return { url: urlData.publicUrl, error: null }
}

// Função para o servidor
export async function getProfileServer(userId: string) {
  const supabaseServer = createServerClient()

  const { data, error } = await supabaseServer.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Erro ao buscar perfil:", error)
    return null
  }

  return data
}

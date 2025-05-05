import { supabase } from "@/lib/supabase/client"
import type { PostgrestError } from "@supabase/supabase-js"

export type Team = {
  id: string
  event_id: string
  name: string
  description?: string
  max_members: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export type TeamMember = {
  team_id: string
  user_id: string
  role: "leader" | "member"
  joined_at: string
  profile?: {
    first_name: string
    last_name: string
    avatar_url?: string
  }
}

export type TeamCreateInput = Omit<Team, "id" | "created_at" | "updated_at">

export async function getTeamsByEvent(
  eventId: string,
): Promise<(Team & { members: TeamMember[]; categories: string[] })[]> {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select(`
        *,
        team_members (
          user_id,
          role,
          profiles (
            first_name,
            last_name,
            avatar_url
          )
        ),
        team_categories (
          category_id,
          categories (
            name
          )
        )
      `)
      .eq("event_id", eventId)

    if (error) {
      console.error("Erro ao buscar times:", error)
      return []
    }

    return data.map((team) => {
      const members =
        team.team_members?.map((member: any) => ({
          ...member,
          profile: member.profiles,
        })) || []

      const categories = team.team_categories?.map((tc: any) => tc.categories.name) || []

      return {
        ...team,
        members,
        categories,
      }
    })
  } catch (error) {
    console.error("Erro inesperado ao buscar times:", error)
    return []
  }
}

export async function getTeamById(
  teamId: string,
): Promise<(Team & { members: TeamMember[]; categories: string[] }) | null> {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select(`
        *,
        team_members (
          user_id,
          role,
          profiles (
            first_name,
            last_name,
            avatar_url
          )
        ),
        team_categories (
          category_id,
          categories (
            name
          )
        )
      `)
      .eq("id", teamId)
      .single()

    if (error) {
      console.error("Erro ao buscar time:", error)
      return null
    }

    const members =
      data.team_members?.map((member: any) => ({
        ...member,
        profile: member.profiles,
      })) || []

    const categories = data.team_categories?.map((tc: any) => tc.categories.name) || []

    return {
      ...data,
      members,
      categories,
    }
  } catch (error) {
    console.error("Erro inesperado ao buscar time:", error)
    return null
  }
}

export async function createTeam(
  teamData: TeamCreateInput,
  userId: string,
  categories?: string[],
): Promise<{ team: Team | null; error: PostgrestError | null }> {
  try {
    // Inserir o time
    const { data: newTeamData, error: teamError } = await supabase.from("teams").insert(teamData).select().single()

    if (teamError) {
      console.error("Erro ao criar time:", teamError)
      return { team: null, error: teamError }
    }

    // Adicionar o criador como líder do time
    const { error: memberError } = await supabase.from("team_members").insert({
      team_id: newTeamData.id,
      user_id: userId,
      role: "leader",
    })

    if (memberError) {
      console.error("Erro ao adicionar líder ao time:", memberError)
      return { team: null, error: memberError }
    }

    // Se houver categorias, inserir as relações
    if (categories && categories.length > 0) {
      // Buscar IDs das categorias
      const { data: categoryData } = await supabase.from("categories").select("id, name").in("name", categories)

      if (categoryData && categoryData.length > 0) {
        const teamCategories = categoryData.map((category) => ({
          team_id: newTeamData.id,
          category_id: category.id,
        }))

        const { error: categoryError } = await supabase.from("team_categories").insert(teamCategories)

        if (categoryError) {
          console.error("Erro ao adicionar categorias ao time:", categoryError)
        }
      }
    }

    return { team: newTeamData, error: null }
  } catch (error) {
    console.error("Erro inesperado ao criar time:", error)
    return { team: null, error: { message: "Erro interno do servidor" } as PostgrestError }
  }
}

export async function joinTeam(teamId: string, userId: string): Promise<{ error: PostgrestError | null }> {
  try {
    const { error } = await supabase.from("team_members").insert({
      team_id: teamId,
      user_id: userId,
      role: "member",
    })

    return { error }
  } catch (error) {
    console.error("Erro inesperado ao entrar no time:", error)
    return { error: { message: "Erro interno do servidor" } as PostgrestError }
  }
}

export async function leaveTeam(teamId: string, userId: string): Promise<{ error: PostgrestError | null }> {
  try {
    const { error } = await supabase.from("team_members").delete().eq("team_id", teamId).eq("user_id", userId)

    return { error }
  } catch (error) {
    console.error("Erro inesperado ao sair do time:", error)
    return { error: { message: "Erro interno do servidor" } as PostgrestError }
  }
}

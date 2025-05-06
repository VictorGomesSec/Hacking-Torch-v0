import { createServerClient } from "@/lib/supabase/server"

export type AdminStats = {
  totalUsers: number
  totalEvents: number
  totalTeams: number
  totalSubmissions: number
  activeEvents: number
  pendingEvents: number
}

export type UserWithProfile = {
  id: string
  email: string
  created_at: string
  user_type: "participant" | "organizer" | "admin"
  first_name: string
  last_name: string
  avatar_url?: string
  status: "active" | "suspended" | "pending"
}

export async function getAdminStats(): Promise<AdminStats | null> {
  try {
    const supabaseServer = createServerClient()

    // Obter contagem de usuários
    const { count: totalUsers } = await supabaseServer.from("profiles").select("*", { count: "exact", head: true })

    // Obter contagem de eventos
    const { count: totalEvents } = await supabaseServer.from("events").select("*", { count: "exact", head: true })

    // Obter contagem de eventos ativos
    const { count: activeEvents } = await supabaseServer
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("status", "active")

    // Obter contagem de eventos pendentes
    const { count: pendingEvents } = await supabaseServer
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")

    // Obter contagem de equipes
    const { count: totalTeams } = await supabaseServer.from("teams").select("*", { count: "exact", head: true })

    // Obter contagem de submissões
    const { count: totalSubmissions } = await supabaseServer
      .from("submissions")
      .select("*", { count: "exact", head: true })

    return {
      totalUsers: totalUsers || 0,
      totalEvents: totalEvents || 0,
      activeEvents: activeEvents || 0,
      pendingEvents: pendingEvents || 0,
      totalTeams: totalTeams || 0,
      totalSubmissions: totalSubmissions || 0,
    }
  } catch (error) {
    console.error("Erro ao obter estatísticas de admin:", error)
    return null
  }
}

export async function getAllUsers(
  page = 1,
  limit = 10,
  filter?: string,
): Promise<{ users: UserWithProfile[]; count: number }> {
  try {
    const supabaseServer = createServerClient()
    const offset = (page - 1) * limit

    let query = supabaseServer.from("profiles").select(
      `
        id,
        email,
        created_at,
        user_type,
        first_name,
        last_name,
        avatar_url,
        status
      `,
      { count: "exact" },
    )

    if (filter) {
      query = query.or(`first_name.ilike.%${filter}%,last_name.ilike.%${filter}%,email.ilike.%${filter}%`)
    }

    const {
      data: users,
      count,
      error,
    } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    if (error) {
      console.error("Erro ao buscar usuários:", error)
      return { users: [], count: 0 }
    }

    return {
      users: users as UserWithProfile[],
      count: count || 0,
    }
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return { users: [], count: 0 }
  }
}

export async function updateUserStatus(userId: string, status: "active" | "suspended" | "pending") {
  try {
    const supabaseServer = createServerClient()

    const { error } = await supabaseServer.from("profiles").update({ status }).eq("id", userId)

    if (error) {
      console.error("Erro ao atualizar status do usuário:", error)
      return { success: false, error }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Erro ao atualizar status do usuário:", error)
    return { success: false, error }
  }
}

export async function updateUserRole(userId: string, userType: "participant" | "organizer" | "admin") {
  try {
    const supabaseServer = createServerClient()

    const { error } = await supabaseServer.from("profiles").update({ user_type: userType }).eq("id", userId)

    if (error) {
      console.error("Erro ao atualizar função do usuário:", error)
      return { success: false, error }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Erro ao atualizar função do usuário:", error)
    return { success: false, error }
  }
}

export async function getAllEvents(page = 1, limit = 10, filter?: string) {
  try {
    const supabaseServer = createServerClient()
    const offset = (page - 1) * limit

    let query = supabaseServer.from("events").select(
      `
        *,
        profiles:organizer_id (
          first_name,
          last_name,
          email
        )
      `,
      { count: "exact" },
    )

    if (filter) {
      query = query.or(`name.ilike.%${filter}%,description.ilike.%${filter}%`)
    }

    const {
      data: events,
      count,
      error,
    } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    if (error) {
      console.error("Erro ao buscar eventos:", error)
      return { events: [], count: 0 }
    }

    return {
      events,
      count: count || 0,
    }
  } catch (error) {
    console.error("Erro ao buscar eventos:", error)
    return { events: [], count: 0 }
  }
}

export async function updateEventStatus(eventId: string, status: "active" | "pending" | "rejected" | "completed") {
  try {
    const supabaseServer = createServerClient()

    const { error } = await supabaseServer.from("events").update({ status }).eq("id", eventId)

    if (error) {
      console.error("Erro ao atualizar status do evento:", error)
      return { success: false, error }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Erro ao atualizar status do evento:", error)
    return { success: false, error }
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const supabaseServer = createServerClient()

    // Primeiro, excluir registros relacionados
    await supabaseServer.from("event_participants").delete().eq("event_id", eventId)
    await supabaseServer.from("teams").delete().eq("event_id", eventId)
    await supabaseServer.from("submissions").delete().eq("event_id", eventId)

    // Finalmente, excluir o evento
    const { error } = await supabaseServer.from("events").delete().eq("id", eventId)

    if (error) {
      console.error("Erro ao excluir evento:", error)
      return { success: false, error }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Erro ao excluir evento:", error)
    return { success: false, error }
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const supabaseServer = createServerClient()

    const { data, error } = await supabaseServer.from("profiles").select("user_type").eq("id", userId).single()

    if (error || !data) {
      return false
    }

    return data.user_type === "admin"
  } catch (error) {
    console.error("Erro ao verificar se usuário é admin:", error)
    return false
  }
}

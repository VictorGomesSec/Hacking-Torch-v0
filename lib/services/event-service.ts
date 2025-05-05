import { supabase } from "@/lib/supabase/client"
import { createServerClient } from "@/lib/supabase/server"
import type { PostgrestError } from "@supabase/supabase-js"

export type Event = {
  id: string
  organizer_id: string
  name: string
  description: string
  event_type: "hackathon" | "ideathon" | "workshop" | "conference" | "meetup"
  format: "presential" | "online" | "hybrid"
  location?: string
  online_url?: string
  start_date: string
  end_date: string
  cover_image_url?: string
  max_participants?: number
  max_team_size?: number
  registration_fee?: number
  is_featured: boolean
  status: "draft" | "published" | "completed" | "cancelled"
  created_at: string
  updated_at: string
  categories?: string[]
}

export type EventCreateInput = Omit<Event, "id" | "created_at" | "updated_at">
export type EventUpdateInput = Partial<Omit<Event, "id" | "created_at" | "updated_at">>

export async function getEvents(
  options: {
    limit?: number
    featured?: boolean
    status?: string
    type?: string
    upcoming?: boolean
  } = {},
): Promise<Event[]> {
  try {
    const { limit = 10, featured, status = "published", type, upcoming } = options

    let query = supabase
      .from("events")
      .select(`
        *,
        event_categories (
          category_id,
          categories (
            name
          )
        )
      `)
      .eq("status", status)

    if (featured) {
      query = query.eq("is_featured", true)
    }

    if (type) {
      query = query.eq("event_type", type)
    }

    if (upcoming) {
      query = query.gt("start_date", new Date().toISOString())
    }

    const { data, error } = await query.order("start_date", { ascending: true }).limit(limit)

    if (error) {
      console.error("Erro ao buscar eventos:", error)
      return []
    }

    // Transformar os dados para um formato mais fácil de usar
    return data.map((event) => {
      const categories = event.event_categories?.map((ec: any) => ec.categories.name) || []
      return {
        ...event,
        categories,
      }
    })
  } catch (error) {
    console.error("Erro inesperado ao buscar eventos:", error)
    return []
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select(`
        *,
        event_categories (
          category_id,
          categories (
            name
          )
        ),
        event_schedule (
          *
        ),
        event_prizes (
          *
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Erro ao buscar evento:", error)
      return null
    }

    const categories = data.event_categories?.map((ec: any) => ec.categories.name) || []

    return {
      ...data,
      categories,
    }
  } catch (error) {
    console.error("Erro inesperado ao buscar evento:", error)
    return null
  }
}

export async function createEvent(
  eventData: EventCreateInput,
): Promise<{ event: Event | null; error: PostgrestError | null }> {
  try {
    const { categories, ...event } = eventData

    // Inserir o evento
    const { data: newEventData, error: eventError } = await supabase.from("events").insert(event).select().single()

    if (eventError) {
      console.error("Erro ao criar evento:", eventError)
      return { event: null, error: eventError }
    }

    // Se houver categorias, inserir as relações
    if (categories && categories.length > 0) {
      // Buscar IDs das categorias
      const { data: categoryData } = await supabase.from("categories").select("id, name").in("name", categories)

      if (categoryData && categoryData.length > 0) {
        const eventCategories = categoryData.map((category) => ({
          event_id: newEventData.id,
          category_id: category.id,
        }))

        const { error: categoryError } = await supabase.from("event_categories").insert(eventCategories)

        if (categoryError) {
          console.error("Erro ao adicionar categorias ao evento:", categoryError)
        }
      }
    }

    return { event: newEventData, error: null }
  } catch (error) {
    console.error("Erro inesperado ao criar evento:", error)
    return { event: null, error: { message: "Erro interno do servidor" } as PostgrestError }
  }
}

export async function updateEvent(
  id: string,
  eventData: EventUpdateInput,
): Promise<{ event: Event | null; error: PostgrestError | null }> {
  try {
    const { categories, ...event } = eventData

    // Atualizar o evento
    const { data: updatedEventData, error: eventError } = await supabase
      .from("events")
      .update(event)
      .eq("id", id)
      .select()
      .single()

    if (eventError) {
      console.error("Erro ao atualizar evento:", eventError)
      return { event: null, error: eventError }
    }

    // Se houver categorias, atualizar as relações
    if (categories && categories.length > 0) {
      // Remover categorias existentes
      await supabase.from("event_categories").delete().eq("event_id", id)

      // Buscar IDs das categorias
      const { data: categoryData } = await supabase.from("categories").select("id, name").in("name", categories)

      if (categoryData && categoryData.length > 0) {
        const eventCategories = categoryData.map((category) => ({
          event_id: id,
          category_id: category.id,
        }))

        const { error: categoryError } = await supabase.from("event_categories").insert(eventCategories)

        if (categoryError) {
          console.error("Erro ao atualizar categorias do evento:", categoryError)
        }
      }
    }

    return { event: updatedEventData, error: null }
  } catch (error) {
    console.error("Erro inesperado ao atualizar evento:", error)
    return { event: null, error: { message: "Erro interno do servidor" } as PostgrestError }
  }
}

export async function deleteEvent(id: string): Promise<{ error: PostgrestError | null }> {
  try {
    const { error } = await supabase.from("events").delete().eq("id", id)
    return { error }
  } catch (error) {
    console.error("Erro inesperado ao excluir evento:", error)
    return { error: { message: "Erro interno do servidor" } as PostgrestError }
  }
}

// Função para o servidor
export async function getEventsServer(
  options: {
    limit?: number
    featured?: boolean
    status?: string
    type?: string
    upcoming?: boolean
  } = {},
): Promise<Event[]> {
  try {
    const supabaseServer = createServerClient()
    const { limit = 10, featured, status = "published", type, upcoming } = options

    let query = supabaseServer
      .from("events")
      .select(`
        *,
        event_categories (
          category_id,
          categories (
            name
          )
        )
      `)
      .eq("status", status)

    if (featured) {
      query = query.eq("is_featured", true)
    }

    if (type) {
      query = query.eq("event_type", type)
    }

    if (upcoming) {
      query = query.gt("start_date", new Date().toISOString())
    }

    const { data, error } = await query.order("start_date", { ascending: true }).limit(limit)

    if (error) {
      console.error("Erro ao buscar eventos:", error)
      return []
    }

    // Transformar os dados para um formato mais fácil de usar
    return data.map((event) => {
      const categories = event.event_categories?.map((ec: any) => ec.categories.name) || []
      return {
        ...event,
        categories,
      }
    })
  } catch (error) {
    console.error("Erro inesperado ao buscar eventos no servidor:", error)
    return []
  }
}

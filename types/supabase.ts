export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          bio: string | null
          website: string | null
          avatar_url: string | null
          user_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          bio?: string | null
          website?: string | null
          avatar_url?: string | null
          user_type: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          bio?: string | null
          website?: string | null
          avatar_url?: string | null
          user_type?: string
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          organizer_id: string
          name: string
          description: string | null
          event_type: string
          format: string
          location: string | null
          online_url: string | null
          start_date: string
          end_date: string
          cover_image_url: string | null
          max_participants: number | null
          max_team_size: number | null
          registration_fee: number | null
          is_featured: boolean | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organizer_id: string
          name: string
          description?: string | null
          event_type: string
          format: string
          location?: string | null
          online_url?: string | null
          start_date: string
          end_date: string
          cover_image_url?: string | null
          max_participants?: number | null
          max_team_size?: number | null
          registration_fee?: number | null
          is_featured?: boolean | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organizer_id?: string
          name?: string
          description?: string | null
          event_type?: string
          format?: string
          location?: string | null
          online_url?: string | null
          start_date?: string
          end_date?: string
          cover_image_url?: string | null
          max_participants?: number | null
          max_team_size?: number | null
          registration_fee?: number | null
          is_featured?: boolean | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Adicione outras tabelas conforme necessário
    }
  }
}

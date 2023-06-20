export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      decks: {
        Row: {
          created_at: string | null
          deck_format: number | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          deck_format?: number | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          deck_format?: number | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decks_deck_format_fkey"
            columns: ["deck_format"]
            referencedRelation: "decks_formats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      decks_cards: {
        Row: {
          deck_id: number | null
          gatherer_id: string
          id: number
        }
        Insert: {
          deck_id?: number | null
          gatherer_id: string
          id: number
        }
        Update: {
          deck_id?: number | null
          gatherer_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "decks_cards_deck_id_fkey"
            columns: ["deck_id"]
            referencedRelation: "decks"
            referencedColumns: ["id"]
          }
        ]
      }
      decks_formats: {
        Row: {
          allow_rares: boolean | null
          card_limit: number | null
          format_name: string | null
          has_commander: boolean | null
          id: number
        }
        Insert: {
          allow_rares?: boolean | null
          card_limit?: number | null
          format_name?: string | null
          has_commander?: boolean | null
          id?: number
        }
        Update: {
          allow_rares?: boolean | null
          card_limit?: number | null
          format_name?: string | null
          has_commander?: boolean | null
          id?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


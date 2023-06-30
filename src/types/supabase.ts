export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type CompleteDeckInformation = Deck &
  Format &
  Color[] &
  Card[];

export type DeckWithColors = Deck & {
  decks_colors: DeckColor[] | null;
};

export type Deck = {
  comander_id: string | null;
  deck_format: number;
  id: number;
  name: string | null;
  notes: string | null;
  oathbreaker_id: string | null;
  signature_spell_id: string | null;
  user_id: string | null;
};

export type DeckColor = {
  color_id: number | null;
  deck_id: number | null;
  id: number;
};

export type DeckVersion = {
  created_at: string | null;
  deck_id: number | null;
  id: string;
  losses: number | null;
  wins: number | null;
};

export type Format = {
  allow_rares: boolean | null;
  card_limit: number | null;
  format_name: string | null;
  has_commander: boolean | null;
  has_oath_breaker: boolean | null;
  has_signature_spell: boolean | null;
  id: number;
};

export type Card = {
  deck_id: number;
  gatherer_id: string;
  id: number;
  multiverse_id: number | null;
  version_id: string;
};

export type Profile = {
  avatar_url: string | null;
  id: string;
  updated_at: string | null;
  username: string | null;
};

export type Color = {
  color: string | null;
  id: number;
  letter: string | null;
};

export interface Database {
  public: {
    Tables: {
      colors: {
        Row: {
          color: string | null;
          id: number;
          letter: string | null;
        };
        Insert: {
          color?: string | null;
          id?: number;
          letter?: string | null;
        };
        Update: {
          color?: string | null;
          id?: number;
          letter?: string | null;
        };
        Relationships: [];
      };
      deck_version: {
        Row: {
          created_at: string | null;
          deck_id: number | null;
          id: string;
          losses: number | null;
          wins: number | null;
        };
        Insert: {
          created_at?: string | null;
          deck_id?: number | null;
          id?: string;
          losses?: number | null;
          wins?: number | null;
        };
        Update: {
          created_at?: string | null;
          deck_id?: number | null;
          id?: string;
          losses?: number | null;
          wins?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'deck_version_deck_id_fkey';
            columns: ['deck_id'];
            referencedRelation: 'decks';
            referencedColumns: ['id'];
          }
        ];
      };
      decks: {
        Row: {
          comander_id: string | null;
          deck_format: number;
          id: number;
          name: string | null;
          notes: string | null;
          oathbreaker_id: string | null;
          signature_spell_id: string | null;
          user_id: string | null;
        };
        Insert: {
          comander_id?: string | null;
          deck_format: number;
          id?: number;
          name?: string | null;
          notes?: string | null;
          oathbreaker_id?: string | null;
          signature_spell_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          comander_id?: string | null;
          deck_format?: number;
          id?: number;
          name?: string | null;
          notes?: string | null;
          oathbreaker_id?: string | null;
          signature_spell_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'decks_deck_format_fkey';
            columns: ['deck_format'];
            referencedRelation: 'decks_formats';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'decks_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      decks_cards: {
        Row: {
          deck_id: number;
          gatherer_id: string | null;
          id: number;
          multiverse_id: number;
          version_id: string;
        };
        Insert: {
          deck_id: number;
          gatherer_id?: string | null;
          id?: number;
          multiverse_id: number;
          version_id: string;
        };
        Update: {
          deck_id?: number;
          gatherer_id?: string | null;
          id?: number;
          multiverse_id?: number;
          version_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'decks_cards_deck_id_fkey';
            columns: ['deck_id'];
            referencedRelation: 'decks';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'decks_cards_version_id_fkey';
            columns: ['version_id'];
            referencedRelation: 'deck_version';
            referencedColumns: ['id'];
          }
        ];
      };
      decks_colors: {
        Row: {
          color_id: number | null;
          deck_id: number | null;
          id: number;
        };
        Insert: {
          color_id?: number | null;
          deck_id?: number | null;
          id: number;
        };
        Update: {
          color_id?: number | null;
          deck_id?: number | null;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'decks_colors_color_id_fkey';
            columns: ['color_id'];
            referencedRelation: 'colors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'decks_colors_deck_id_fkey';
            columns: ['deck_id'];
            referencedRelation: 'decks';
            referencedColumns: ['id'];
          }
        ];
      };
      decks_formats: {
        Row: {
          allow_rares: boolean | null;
          card_limit: number | null;
          format_name: string | null;
          has_commander: boolean | null;
          has_oath_breaker: boolean | null;
          has_signature_spell: boolean | null;
          id: number;
        };
        Insert: {
          allow_rares?: boolean | null;
          card_limit?: number | null;
          format_name?: string | null;
          has_commander?: boolean | null;
          has_oath_breaker?: boolean | null;
          has_signature_spell?: boolean | null;
          id?: number;
        };
        Update: {
          allow_rares?: boolean | null;
          card_limit?: number | null;
          format_name?: string | null;
          has_commander?: boolean | null;
          has_oath_breaker?: boolean | null;
          has_signature_spell?: boolean | null;
          id?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_deck_cards: {
        Args: {
          deck_id_param: number;
        };
        Returns: {
          deck_id: number;
          gatherer_id: string | null;
          id: number;
          multiverse_id: number;
          version_id: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

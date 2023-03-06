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
      appointment: {
        Row: {
          created_at: string | null
          date: string | null
          doctor: string | null
          id: number
          latitude: number | null
          longitude: number | null
          name: string | null
          patient: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          doctor?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          patient?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          doctor?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          patient?: string | null
        }
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

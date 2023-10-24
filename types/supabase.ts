export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      students: {
        Row: {
          age: number | null;
          created_at: string;
          gender: string | null;
          id: number;
          last_name: string | null;
          name: string | null;
          room: string | null;
        };
        Insert: {
          age?: number | null;
          created_at?: string;
          gender?: string | null;
          id?: number;
          last_name?: string | null;
          name?: string | null;
          room?: string | null;
        };
        Update: {
          age?: number | null;
          created_at?: string;
          gender?: string | null;
          id?: number;
          last_name?: string | null;
          name?: string | null;
          room?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      mix: "asda" | "123";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type RoomsType = Database["public"]["Tables"]["rooms"]["Row"];

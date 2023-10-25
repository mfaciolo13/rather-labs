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
          description: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      students: {
        Row: {
          created_at: string;
          date_of_birth: string;
          email: string;
          gender: string;
          id: number;
          last_name: string;
          name: string;
          room: number;
        };
        Insert: {
          created_at?: string;
          date_of_birth: string;
          email: string;
          gender: string;
          id?: number;
          last_name: string;
          name: string;
          room: number;
        };
        Update: {
          created_at?: string;
          date_of_birth?: string;
          email?: string;
          gender?: string;
          id?: number;
          last_name?: string;
          name?: string;
          room?: number;
        };
        Relationships: [
          {
            foreignKeyName: "students_room_fkey";
            columns: ["room"];
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
        ];
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

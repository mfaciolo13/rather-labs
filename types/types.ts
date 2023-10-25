import { Database } from "./supabase";

export type RoomsType = Database["public"]["Tables"]["rooms"]["Row"];
export type StudentsType = Database["public"]["Tables"]["students"]["Row"];

export interface StudentsFormProps {
  name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  gender: string;
  room: number;
}

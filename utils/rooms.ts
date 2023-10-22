import { supabase } from "../lib/supabase";

export const getRooms = async () => {
  const { data, error } = await supabase.from("rooms").select();
  if (error) {
    throw error;
  }
  return data;
};

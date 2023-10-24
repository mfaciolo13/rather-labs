import { Toast } from "react-native-toast-notifications";

import { supabase } from "../lib/supabase";

export const getRooms = async () => {
  try {
    const { data, error } = await supabase.from("rooms").select();
    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    Toast.show(error.details, {
      type: "danger",
    });
  }
};

export const createRoom = async (params: {
  name: string;
  description: string;
}) => {
  try {
    const { data, error } = await supabase.from("rooms").insert(params);
    if (error) {
      throw error;
    }

    Toast.show("Room created successfully", {
      type: "success",
    });

    return data;
  } catch (error: any) {
    if (error.details.includes(params.name)) {
      Toast.show("Room name already exists", {
        type: "danger",
      });
      return;
    }

    Toast.show(error.details, {
      type: "danger",
    });
  }
};

export const deleteRoom = async (id: number) => {
  try {
    const { error } = await supabase.from("rooms").delete().match({ id });
    if (error) {
      throw error;
    }

    Toast.show("Room deleted successfully", {
      type: "success",
    });
  } catch (error: any) {
    Toast.show(error.details, {
      type: "danger",
    });
  }
};

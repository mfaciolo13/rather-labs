import { Toast } from "react-native-toast-notifications";

import { supabase } from "../lib/supabase";
import { StudentsFormProps } from "../types/types";

export const getStudents = async () => {
  try {
    const { data, error } = await supabase.from("students").select();
    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error trying to get the students", error);
    Toast.show(error.details, {
      type: "danger",
    });
  }
};

export const createStudent = async (params: StudentsFormProps) => {
  try {
    const { data, error } = await supabase.from("students").insert(params);
    if (error) {
      throw error;
    }

    Toast.show("Student created successfully", {
      type: "success",
    });

    return data;
  } catch (error: any) {
    console.error("Error trying to create the student", error);

    if (error.details.includes(params.name)) {
      Toast.show("Student name already exists", {
        type: "danger",
      });
      return;
    }

    Toast.show(error.details, {
      type: "danger",
    });
  }
};

export const removeStudent = async (id: number) => {
  try {
    const { error } = await supabase.from("students").delete().match({ id });
    if (error) {
      throw error;
    }

    Toast.show("Student removed successfully", {
      type: "success",
    });
  } catch (error: any) {
    console.error("Error trying to remove the student", error);
    Toast.show(error.details, {
      type: "danger",
    });
  }
};

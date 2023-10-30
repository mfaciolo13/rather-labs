import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useFocusEffect } from "expo-router/src/useFocusEffect";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";

import { getRooms } from "../../api/rooms";
import { createStudent } from "../../api/students";
import BasePicker from "../../components/BasePicker";
import Button from "../../components/Button";
import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
import { STUDENTS_FORM_NAMES } from "../../constants/formNames";
import { showBottomSheet } from "../../reducers/bottomsheetReducer";
import { RoomsType } from "../../types/types";
import {
  YEAR_DATE_FORMAT_OPTION,
  formatLocalDateString,
} from "../../utils/date";
import { formErrors } from "../../utils/errors";
import { snakeCaseToTitleCase } from "../../utils/strings";
import { genderOptions } from "../../utils/studentsData";
import { emailRegex } from "../../utils/validations";

interface StudentsFormProps {
  name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  gender: string;
  room: number;
}

const Students = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [rooms, setRooms] = useState<RoomsType[] | []>([]);

  const fetchRooms = async () => {
    const data = await getRooms();

    setRooms(data ?? []);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRooms();
    }, []),
  );

  const { control, handleSubmit } = useForm<StudentsFormProps>({
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
    },
  });

  const [openDateModal, setOpenDateModal] = useState(false);

  const onSubmit = async (data: StudentsFormProps) => createStudent(data);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create room",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <FontAwesome name="chevron-left" size={20} color="black" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.contentContainer}>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              label={snakeCaseToTitleCase(STUDENTS_FORM_NAMES.STUDENT_NAME)}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={formErrors(error?.type as string)}
            />
          )}
          name={STUDENTS_FORM_NAMES.STUDENT_NAME}
          rules={{ required: true, minLength: 3, maxLength: 20 }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              label={snakeCaseToTitleCase(
                STUDENTS_FORM_NAMES.STUDENT_LAST_NAME,
              )}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={formErrors(error?.type as string)}
            />
          )}
          name={STUDENTS_FORM_NAMES.STUDENT_LAST_NAME}
          rules={{ required: true, minLength: 3, maxLength: 20 }}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              label={snakeCaseToTitleCase(STUDENTS_FORM_NAMES.STUDENT_EMAIL)}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={
                error?.message
                  ? error.message
                  : formErrors(error?.type as string)
              }
            />
          )}
          name={STUDENTS_FORM_NAMES.STUDENT_EMAIL}
          rules={{
            required: true,
            pattern: {
              value: emailRegex,
              message: "Invalid email address",
            },
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TouchableOpacity onPress={() => setOpenDateModal(true)}>
              <View pointerEvents="none">
                <Input
                  label={snakeCaseToTitleCase(
                    STUDENTS_FORM_NAMES.STUDENT_DATE_OF_BIRTH,
                  )}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={
                    value &&
                    formatLocalDateString(
                      new Date(value),
                      YEAR_DATE_FORMAT_OPTION,
                    )
                  }
                  error={formErrors(error?.type as string)}
                  keyboardType="numeric"
                />
              </View>
              <DateTimePickerModal
                isVisible={openDateModal}
                mode="date"
                onConfirm={(date) => {
                  setOpenDateModal(false);
                  onChange(date);
                }}
                onCancel={() => setOpenDateModal(false)}
                date={new Date(value)}
              />
            </TouchableOpacity>
          )}
          name={STUDENTS_FORM_NAMES.STUDENT_DATE_OF_BIRTH}
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  showBottomSheet({
                    content: (
                      <BasePicker
                        label={snakeCaseToTitleCase(
                          STUDENTS_FORM_NAMES.STUDENT_ROOM,
                        )}
                        options={rooms?.map(
                          (room: { name: string; id: number }) => ({
                            label: room.name,
                            value: room.id.toString(),
                          }),
                        )}
                        onChange={onChange}
                        value={String(value)}
                        error={formErrors(error?.type as string)}
                      />
                    ),
                  }),
                )
              }
            >
              <View pointerEvents="none">
                <Input
                  label={snakeCaseToTitleCase(STUDENTS_FORM_NAMES.STUDENT_ROOM)}
                  onChange={onChange}
                  {...(value ? { value: value.toString() } : { value: "" })}
                  error={formErrors(error?.type as string)}
                />
              </View>
            </TouchableOpacity>
          )}
          name={STUDENTS_FORM_NAMES.STUDENT_ROOM}
          rules={{ required: false }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <RadioButton
              label={snakeCaseToTitleCase(STUDENTS_FORM_NAMES.STUDENT_GENDER)}
              options={genderOptions}
              onChange={onChange}
              value={value}
              error={formErrors(error?.type as string)}
            />
          )}
          name={STUDENTS_FORM_NAMES.STUDENT_GENDER}
          rules={{ required: true }}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button onPress={handleSubmit(onSubmit)} filled>
          Create
        </Button>
      </View>
    </View>
  );
};

export default Students;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    rowGap: 12,
  },
  buttonsContainer: { alignItems: "center" },
});

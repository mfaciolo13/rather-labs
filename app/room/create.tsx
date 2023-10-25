import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import { createRoom } from "../../api/rooms";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { CREATE_ROOM_FORM_NAMES } from "../../constants/formNames";
import { formErrors } from "../../utils/errors";

interface Props {
  name: string;
  description: string;
}

const Create = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Props>();

  const onSubmit = async (data: Props) => {
    await createRoom(data);

    return router.replace("/");
  };

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
              label="Name"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={formErrors(error?.type as string)}
            />
          )}
          name={CREATE_ROOM_FORM_NAMES.ROOM_NAME}
          rules={{ required: true, minLength: 3, maxLength: 20 }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => {
            return (
              <Input
                label="Description"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                error={formErrors(error?.type as string)}
              />
            );
          }}
          name={CREATE_ROOM_FORM_NAMES.ROOM_DESCRIPTION}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 20,
          }}
          defaultValue=""
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          isDisabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          filled
        >
          Create
        </Button>
        <Button isDisabled={isSubmitting} onPress={() => router.back()}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  contentContainer: { flex: 1, rowGap: 12 },
  buttonsContainer: { alignItems: "center" },
});

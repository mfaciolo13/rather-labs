import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { createRoom } from "../../api/rooms";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { CREATE_ROOM_FORM_NAMES } from "../../constants/formNames";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  name: string;
  description: string;
}

const create = () => {
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
    <View style={{ flex: 1, padding: 8, backgroundColor: "#fff" }}>
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
      <View style={{ flex: 1, rowGap: 8 }}>
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
              error={error?.message}
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
          }) => (
            <Input
              label="Description"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={error?.message}
            />
          )}
          name={CREATE_ROOM_FORM_NAMES.ROOM_DESCRIPTION}
          rules={{ required: true }}
          defaultValue=""
        />
      </View>

      <View style={{ alignItems: "center" }}>
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

export default create;

const styles = StyleSheet.create({});

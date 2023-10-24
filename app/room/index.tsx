import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const Room = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <FontAwesome name="chevron-left" size={20} color="black" />
            </Pressable>
          ),
        }}
      />
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({});

import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const Room = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

import { FontAwesome } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { formatLocalDateString } from "../../utils/date";

const Student = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { id, name, description, created_at } = params;

  console.log(params);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Student",
          headerLeft: () => (
            <Pressable onPress={() => router.replace("/students")}>
              <FontAwesome name="chevron-left" size={20} color="black" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text>{name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Id:</Text>
          <Text>{id}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Description:</Text>
          <Text>{description}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Created at:</Text>
          <Text>{formatLocalDateString(new Date(created_at as string))}</Text>
        </View>
      </View>
    </View>
  );
};

export default Student;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  content: { gap: 12, padding: 16 },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "600",
  },
});

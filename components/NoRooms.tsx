import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NoRooms = () => {
  return (
    <View style={styles.container}>
      <Text>No Rooms</Text>
    </View>
  );
};

export default NoRooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

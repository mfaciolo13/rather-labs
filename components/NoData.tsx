import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NoData = () => {
  return (
    <View style={styles.container}>
      <Text>No Data</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

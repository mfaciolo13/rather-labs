import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import Rooms from "../../components/Rooms";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Rooms />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

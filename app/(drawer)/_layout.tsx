import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import BottomSheetDialog from "../../components/BottomSheetDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  hideBottomSheet,
  showBottomSheet,
} from "../../reducers/bottomsheetReducer";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const bottomSheet = useSelector(({ bottomSheet }) => bottomSheet);
  const dispatch = useDispatch();

  const handleCreateRoom = () => {
    dispatch(
      showBottomSheet({
        content: <Text>Create new room</Text>,
      })
    );
  };

  const onDismiss = () => {
    dispatch(hideBottomSheet());
  };

  return (
    <>
      <Drawer
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <Pressable onPress={navigation.toggleDrawer}>
              <FontAwesome
                name="bars"
                size={20}
                style={{
                  marginLeft: 15,
                }}
              />
            </Pressable>
          ),
          title: "Rather Labs",
        })}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Entypo
                      name="dots-three-horizontal"
                      size={20}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Drawer.Screen
          name="two"
          options={{
            drawerLabel: "Students",
          }}
        />
      </Drawer>
      <BottomSheetDialog
        visible={bottomSheet.generalBsm.visible}
        content={bottomSheet.generalBsm.content}
        onDismiss={onDismiss}
      />
      <Pressable style={styles.plusButton} onPress={handleCreateRoom}>
        <Entypo name="plus" size={20} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    borderRadius: 100,
    bottom: 20,
    position: "absolute",
    right: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
});

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Drawer } from "expo-router/drawer";

import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";

import BottomSheetDialog from "../components/BottomSheetDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  hideBottomSheet,
  showBottomSheet,
} from "../reducers/bottomsheetReducer";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { RoomsType } from "../types/supabase";
import { getRooms } from "../utils/rooms";
import { Link } from "expo-router";
import { cardsColors } from "../constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const bottomSheet = useSelector(({ bottomSheet }) => bottomSheet);
  const dispatch = useDispatch();

  const [rooms, setRooms] = useState<RoomsType>([]);

  const handleAction = () =>
    dispatch(
      showBottomSheet({
        content: <Text>Delete room</Text>,
      })
    );

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRooms();

      setRooms(data);
    };
    fetchRooms();
  }, []);

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
      <View style={styles.container}>
        {rooms.map((room, index) => {
          return (
            <Link
              href={
                {
                  pathname: "/room",
                  params: {
                    id: room.id,
                  },
                } as any
              }
              asChild
              key={room.id}
              style={[styles.card, { backgroundColor: cardsColors[index] }]}
            >
              <Pressable>
                <Text>{room.name}</Text>
                <Pressable onPress={handleAction}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color="white"
                  />
                </Pressable>
              </Pressable>
            </Link>
          );
        })}
      </View>
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
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 8,
    paddingTop: 8,
    rowGap: 8,
  },
  card: {
    backgroundColor: "blue",
    borderRadius: 6,
    padding: 16,
    width: "100%",
    height: 90,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

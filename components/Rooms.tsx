import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Link } from "expo-router";
import { RoomsType } from "../types/supabase";
import { getRooms } from "../utils/rooms";
import { showBottomSheet } from "../reducers/bottomsheetReducer";
import { cardsColors } from "../constants/Colors";

const Rooms = () => {
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

  return (
    <View style={styles.container}>
      {rooms.map((room, index) => {
        return (
          <Link
            href={{
              pathname: "/room/[id]",
              params: { id: "bacon" },
            }}
            asChild
            key={room.id}
            style={[styles.card, { backgroundColor: cardsColors[index] }]}
          >
            <Pressable>
              <Text>{room.name}</Text>
              <Pressable onPress={handleAction}>
                <Entypo name="dots-three-horizontal" size={20} color="white" />
              </Pressable>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
};

export default Rooms;

const styles = StyleSheet.create({
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

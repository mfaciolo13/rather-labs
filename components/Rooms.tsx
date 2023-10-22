import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RoomsType } from "../types/supabase";
import { getRooms } from "../utils/rooms";
import { Entypo } from "@expo/vector-icons";
import { cardsColors } from "../constants/Colors";

const Rooms = () => {
  const [rooms, setRooms] = useState<RoomsType>([]);

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
          <Pressable
            key={room.id}
            style={[styles.card, { backgroundColor: cardsColors[index] }]}
          >
            <Text>{room.name}</Text>
            <Pressable>
              <Entypo name="dots-three-horizontal" size={20} color="white" />
            </Pressable>
          </Pressable>
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

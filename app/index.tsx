import Entypo from "@expo/vector-icons/Entypo";

import { FlatList, Pressable, StyleSheet, Text } from "react-native";

import BottomSheetDialog from "../components/BottomSheetDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  hideBottomSheet,
  showBottomSheet,
} from "../reducers/bottomsheetReducer";
import { View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { RoomsType } from "../types/supabase";
import { deleteRoom, getRooms } from "../api/rooms";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { cardsColors } from "../constants/Colors";
import NoRooms from "../components/NoRooms";

export default function TabLayout() {
  const bottomSheet = useSelector(({ bottomSheet }) => bottomSheet);
  const dispatch = useDispatch();
  const router = useRouter();

  const [rooms, setRooms] = useState<RoomsType[] | undefined>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRooms = async () => {
    setRefreshing(true);
    const data = await getRooms();

    setRooms(data);
    setRefreshing(false);
  };

  const handleAction = (id: number) =>
    dispatch(
      showBottomSheet({
        content: (
          <Pressable
            onPress={async () => {
              await deleteRoom(id);

              onDismiss();
              return fetchRooms();
            }}
          >
            <Text>Delete room</Text>
          </Pressable>
        ),
      })
    );

  const handleCreateRoom = () => {
    dispatch(
      showBottomSheet({
        content: (
          <Pressable
            onPress={() => {
              router.push("/room/create");
              onDismiss();
            }}
          >
            <Text>Create room</Text>
          </Pressable>
        ),
      })
    );
  };

  const onDismiss = () => {
    dispatch(hideBottomSheet());
  };

  useFocusEffect(
    useCallback(() => {
      fetchRooms();
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          onRefresh={fetchRooms}
          refreshing={refreshing}
          ListEmptyComponent={() => <NoRooms />}
          data={rooms}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item, index }) => (
            <Link
              href={
                {
                  pathname: "/room",
                  params: {
                    id: item.id,
                  },
                } as any
              }
              asChild
              style={[styles.card, { backgroundColor: cardsColors[index] }]}
            >
              <Pressable>
                <Text>{item.name}</Text>
                <Pressable onPress={() => handleAction(item.id)}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color="white"
                  />
                </Pressable>
              </Pressable>
            </Link>
          )}
        />
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
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "blue",
    borderRadius: 6,
    padding: 16,
    width: "100%",
    height: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});

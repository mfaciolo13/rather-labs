import Entypo from "@expo/vector-icons/Entypo";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { getStudents, removeStudent } from "../api/students";
import NoData from "../components/NoData";
import { cardsColors } from "../constants/Colors";
import {
  hideBottomSheet,
  showBottomSheet,
} from "../reducers/bottomsheetReducer";
import { StudentsType } from "../types/types";

const Students = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [students, setStudents] = useState<StudentsType[] | undefined>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStudents = async () => {
    setRefreshing(true);
    const data = await getStudents();

    setStudents(data);
    setRefreshing(false);
  };

  const onDismiss = () => {
    dispatch(hideBottomSheet());
  };

  const handleAction = (id: number) =>
    dispatch(
      showBottomSheet({
        content: (
          <Pressable
            onPress={async () => {
              await removeStudent(id);
              onDismiss();
              return fetchStudents();
            }}
          >
            <Text>Delete student</Text>
          </Pressable>
        ),
      }),
    );

  const handleCreateRoom = () => {
    dispatch(
      showBottomSheet({
        content: (
          <Pressable
            onPress={() => {
              router.replace("/student/create");
              onDismiss();
            }}
          >
            <Text>Create student</Text>
          </Pressable>
        ),
      }),
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, []),
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          onRefresh={fetchStudents}
          refreshing={refreshing}
          ListEmptyComponent={() => <NoData />}
          data={students}
          contentContainerStyle={styles.flatList}
          renderItem={({ item, index }) => (
            <Link
              href={
                {
                  pathname: "/student",
                  params: {
                    ...item,
                  },
                } as any
              }
              asChild
              style={[styles.card, { backgroundColor: cardsColors[index] }]}
            >
              <Pressable>
                <View style={styles.text}>
                  <Text style={styles.name}>
                    {item.name} {item.last_name}
                  </Text>
                  <Text style={styles.description}>{item.email}</Text>
                </View>
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
      <Pressable style={styles.plusButton} onPress={handleCreateRoom}>
        <Entypo name="plus" size={20} />
      </Pressable>
    </>
  );
};

export default Students;

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
  flatList: {
    flexGrow: 1,
  },
  text: {
    justifyContent: "space-between",
  },
  name: { fontWeight: "600" },
  description: {
    fontSize: 12,
  },
});

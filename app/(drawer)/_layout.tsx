import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
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
  );
}

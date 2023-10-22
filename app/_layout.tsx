import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Pressable, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "../config/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Drawer } from "expo-router/drawer";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(drawer)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <BottomSheetModalProvider>
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
              headerRight: () => (
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
              ),
            })}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "Home",
              }}
            />
            <Drawer.Screen
              name="room"
              options={{
                drawerItemStyle: {
                  display: "none",
                },
                headerShown: false,
              }}
            />
          </Drawer>
        </BottomSheetModalProvider>
      </Provider>
    </ThemeProvider>
  );
}

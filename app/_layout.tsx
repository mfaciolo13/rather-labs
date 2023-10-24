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
import { ToastProvider } from "react-native-toast-notifications";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

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
        <ToastProvider duration={2000}>
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
              })}
            >
              <Drawer.Screen
                name="index"
                options={{
                  title: "Rooms",
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
        </ToastProvider>
      </Provider>
    </ThemeProvider>
  );
}

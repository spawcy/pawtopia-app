import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          initialRouteName="(screens)/welcome/index"
          screenOptions={{
            gestureEnabled: true,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen
            name="(screens)/welcome/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(screens)/login/index"
            options={{
              headerShown: false,
              headerTransparent: false,
            }}
          />
          <Stack.Screen
            name="(screens)/register/index"
            options={{
              headerShown: false,
              headerTransparent: false,
            }}
          />
          <Stack.Screen
            name="(screens)/(home)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(screens)/(home)/profile"
            options={{
              headerTransparent: true,
              headerTitleAlign: "center",
              title: "Edit Profile",
            }}
          />
          <Stack.Screen
            name="(screens)/(screen-state)/purchase-success"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="service-package"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="dark" backgroundColor="#FFF9EE" />
      </ThemeProvider>
    </SafeAreaView>
  );
}

import { useColorScheme } from "@/hooks/use-color-scheme";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function ServicePackageLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="basic"
          options={{
            // headerTransparent: true,
            headerTitleAlign: "center",
            title: "Basic Package",
          }}
        />
        <Stack.Screen
          name="premium"
          options={{
            // headerTransparent: true,
            headerTitleAlign: "center",
            title: "Premium Package",
          }}
        />
      </Stack>
      <StatusBar style="auto" backgroundColor="#FFF9EE" />
    </ThemeProvider>
  );
}

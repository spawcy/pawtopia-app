import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF9EE" }}>
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF9EE",
          paddingTop: 40,
          paddingInline: 40,
          paddingBottom: 60,
        }}
      >
        <Image
          source={require("@/assets/images/pawtopia-logo.png")}
          style={{ width: "100%", marginBlock: "auto", resizeMode: "contain" }}
        />

        <View style={{ width: "100%", marginTop: "auto" }}>
          <View style={{ marginTop: 30, flexDirection: "row", gap: 20 }}>
            <Pressable
              onPress={() => router.push("/(screens)/login")}
              style={({ pressed }) => [
                {
                  width: "100%",
                  padding: 14,
                  backgroundColor: "#E78454",
                  borderRadius: 10,
                },
                pressed && {
                  transform: [{ scale: 0.98 }],
                  opacity: 0.8,
                },
              ]}
            >
              <Text
                style={{ fontSize: 22, textAlign: "center", color: "white" }}
              >
                Login
              </Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 16, flexDirection: "row", gap: 20 }}>
            <Pressable
              onPress={() => router.push("/(screens)/register")}
              style={({ pressed }) => [
                {
                  width: "100%",
                  padding: 14,
                  borderWidth: 1,
                  borderColor: "#E78454",
                  backgroundColor: "#FDF0DC",
                  borderRadius: 10,
                },
                pressed && {
                  transform: [{ scale: 0.98 }],
                  opacity: 0.8,
                },
              ]}
            >
              <Text
                style={{ fontSize: 22, textAlign: "center", color: "#E78454" }}
              >
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
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
              onPress={() => router.push("/login")}
              style={{
                width: "100%",
                padding: 14,
                backgroundColor: "#E78454",
                borderRadius: 10,
              }}
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
              onPress={() => router.push("/modal")}
              style={{
                width: "100%",
                padding: 14,
                borderWidth: 1,
                borderColor: "#E78454",
                backgroundColor: "#FDF0DC",
                borderRadius: 10,
              }}
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

    /*
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
       <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hallo Naii ku!</ThemedText>
        <HelloWave />
      </ThemedView> 
       <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Cintai</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert("Action pressed")}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> 
     </ParallaxScrollView> */
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

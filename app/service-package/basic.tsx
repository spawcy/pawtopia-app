import { ThemedView } from "@/components/themed-view";
import { auth } from "@/FirebaseConfig";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

export const PET_FACILITIES_BASIC = ["Standard Size Pet Bed", "Food & Water Bowl", "Standard Enclosure with Good Ventilation", "Natural Lighting Access", "Supervised Group Playtime", "Daily Enclosure Cleaning"];

export const PET_DAILY_CARE_BASIC = ["2x Daily Feeding", "30-minute Group Playtime", "1x Daily Health Check", "Water Refresh 3x a Day"];

const ListItem = ({ item }: { item: string }) => (
  <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 2 }}>
    <Text style={{ marginRight: 8, fontSize: 18, color: "black" }}>•</Text>
    <Text style={{ color: "#818898" }}>{item}</Text>
  </View>
);

export default function ServicePackageScreen() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/(screens)/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFF9EE",
      }}
    >
      <ThemedView
        style={{
          width: "100%",
          paddingVertical: 40,
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Image
          source={require("@/assets/images/service-package-placeholder.png")}
          style={{
            width: "100%",
            resizeMode: "cover",
          }}
        />

        <View style={{ gap: 16 }}>
          <Text
            style={{
              color: "#4F2D27",
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 22,
              textAlign: "left",
              marginRight: "auto",
            }}
          >
            Description
          </Text>
          <Text
            style={{
              color: "#818898",
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            A great, cost-effective option for your beloved pets stay. We guarantee a safe, clean, and comfortable environment with staff monitoring during operational hours. Services include two scheduled meals and sufficient rest time.
            Any additional luxury services can be added on separately.
          </Text>
        </View>

        <View style={{ gap: 16, width: "100%" }}>
          <Text
            style={{
              color: "#4F2D27",
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 32,
              marginBottom: 10,
              textAlign: "left",
              marginRight: "auto",
            }}
          >
            Space Facilities
          </Text>
          {PET_FACILITIES_BASIC.map((item) => (
            <ListItem key={item} item={item} />
          ))}
        </View>

        <View style={{ gap: 16, width: "100%" }}>
          <Text
            style={{
              color: "#4F2D27",
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 32,
              marginBottom: 10,
              textAlign: "left",
              marginRight: "auto",
            }}
          >
            Daily Care & Activities
          </Text>
          {PET_DAILY_CARE_BASIC.map((item) => (
            <ListItem key={item} item={item} />
          ))}
        </View>

        <View style={{ marginTop: 30, flexDirection: "row", gap: 20 }}>
          <Pressable
            onPress={() => {
              Alert.alert("Purchase Successful", "You have successfully purchased the service package.");
              router.push("/(screens)/(screen-state)/purchase-success");
            }}
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
            <Text style={{ fontSize: 22, textAlign: "center", color: "white" }}>Buy a package</Text>
          </Pressable>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

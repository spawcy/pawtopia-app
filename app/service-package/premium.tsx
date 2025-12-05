import { ThemedView } from "@/components/themed-view";
import { auth } from "@/FirebaseConfig";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

export const PET_DAILY_CARE_PREMIUM = [
  "Custom Feeding Schedule (Including Supplement Handling)",
  "60-minute Private Play & Training Session",
  "Real-time Photo & Video Updates (3x/day)",
  "Detailed End-of-Day Behavior Report",
  "Specialized Enrichment Toys (Sniffing Mats, Puzzle Feeders)",
];

export const PET_FACILITIES_PREMIUM = [
  "Private/Semi-Private Enclosure",
  "Space Size: 2m x 2.5m (Exclusive Area)",
  "Advanced Ventilation System",
  "Air Purifier Included",
  "Temperature Control Option (Heater/AC available)",
  "Calming Music Speaker",
];

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
            The Premium Package offers the ultimate boarding experience, designed for maximum comfort and personalized attention. Your pet will enjoy an oversized, private enclosure with dedicated climate control and an air purification
            system. This package includes extended one-on-one playtime, custom feeding schedules, and real-time photo/video updates directly from our staff. Its the highest standard of care available
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
          {PET_FACILITIES_PREMIUM.map((item) => (
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
            Space Facilities
          </Text>
          {PET_DAILY_CARE_PREMIUM.map((item) => (
            <ListItem key={item} item={item} />
          ))}
        </View>

        <View style={{ marginTop: 30, flexDirection: "row", gap: 20 }}>
          <Pressable
            onPress={() => {
              Alert.alert("Purchase Successful", "You have successfully purchased the package.");

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

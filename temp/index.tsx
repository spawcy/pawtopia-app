import { ThemedView } from "@/components/themed-view";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

export const PET_CARE_ITEMS = [
  "Soft pet bed",
  "Food & water bowl",
  "Improved ventilation & natural lighting",
  "Premium toys",
  "Air purifier included",
  "Daily enrichment items (sniffing toys, chew toys)",
];

export const PET_PREMIUM_ITEMS = [
  "Space Size: 2m × 2.5m",
  "Indoor Area",
  "Electricity Included (for heater / air purifier)",
  "Semi-private enclosure with good ventilation",
];

const ListItem = ({ item }: { item: string }) => (
  <View
    style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 2 }}
  >
    <Text style={{ marginRight: 8, fontSize: 18, color: "black" }}>•</Text>
    <Text style={{ color: "#818898" }}>{item}</Text>
  </View>
);

export default function ServicePackageScreen() {
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
          // gap: 10,
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
            For this project, you are required to create a fully working
            application using Android. The application that you have to create
            must solve real world problems or real concept.
          </Text>
        </View>

        <View style={{ gap: 16, width: "100%" }}>
          <Text
            style={{
              color: "#4F2D27",
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 50,
              marginBottom: 10,
              textAlign: "left",
              marginRight: "auto",
            }}
          >
            Space Facilities
          </Text>
          {PET_PREMIUM_ITEMS.map((item) => (
            <ListItem key={item} item={item} />
          ))}
        </View>

        <View style={{ gap: 16, width: "100%" }}>
          <Text
            style={{
              color: "#4F2D27",
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 50,
              marginBottom: 10,
              textAlign: "left",
              marginRight: "auto",
            }}
          >
            Space Facilities
          </Text>
          {PET_CARE_ITEMS.map((item) => (
            <ListItem key={item} item={item} />
          ))}
        </View>

        <View style={{ marginTop: 30, flexDirection: "row", gap: 20 }}>
          <Pressable
            onPress={() => {
              Alert.alert(
                "Purchase Successful",
                "You have successfully purchased the package."
              );
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
            <Text style={{ fontSize: 22, textAlign: "center", color: "white" }}>
              Buy a package
            </Text>
          </Pressable>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

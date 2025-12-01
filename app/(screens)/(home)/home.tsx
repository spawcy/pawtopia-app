import { ThemedView } from "@/components/themed-view";
import { auth } from "@/FirebaseConfig";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const SERVICE_DATA = [
  { id: "1", path: "service-package/basic", title: "Basic Package" },
  { id: "2", path: "service-package/premium", title: "Premium Package" },
];

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

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
          paddingInline: 20,
          paddingBottom: 20,
          paddingTop: 40,
          backgroundColor: "#FFF9EE",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <View style={{ gap: 6 }}>
            <Text style={{ color: "#818898" }}>
              Hello,
              <Text style={{ fontSize: 16, fontWeight: "medium" }}>
                {user?.displayName}
              </Text>
          </Text>
            <Text
              style={{ color: "#4F2D27", fontSize: 16, fontWeight: "medium" }}
            >
              How you feel today?
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#ECEFF3",
              borderRadius: 100,
            }}
          >
            <Feather name="bell" size={24} color="black" />
          </View>
        </View>

        <Text
          style={{
            color: "#4F2D27",
            fontWeight: "bold",
            fontSize: 22,
            marginTop: 62,
            marginBottom: 20,
          }}
        >
          Service
        </Text>

        <View style={{ gap: 20 }}>
          {SERVICE_DATA.map(({ id, title, path }) => (
            <View
              key={id}
              style={{
                backgroundColor: "#FDF0DC",
                borderRadius: 10,
                padding: 20,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}
            >
              <View style={{ flex: 1.5 }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#4F2D27",
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{ color: "#828282", marginTop: 6, lineHeight: 22 }}
                >
                  Essential care for a safe and simple stay.
                </Text>
                <View style={{ marginTop: 30, flexDirection: "row", gap: 20 }}>
                  <Pressable
                    onPress={() => router.push(path as any)}
                    style={{
                      width: "100%",
                      padding: 8,
                      paddingBlock: 12,
                      backgroundColor: "#E78454",
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Buy Package
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={require("@/assets/images/basic-package.png")}
                  style={{ width: "100%", resizeMode: "contain" }}
                />
              </View>
            </View>
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

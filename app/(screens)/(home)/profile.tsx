import { auth } from "@/FirebaseConfig";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
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

  const handleUpdateAuthProfile = async () => {
    const user = auth.currentUser;
    if (!user) {
      return Alert.alert("Error", "No user is currently signed in.");
    }

    try {
      await updateProfile(user, {
        displayName: username,
        // photoURL: newPhotoURL || user.photoURL,
      });

      await user.reload();
      router.replace("/(screens)/(home)/profile");

      setUser(auth.currentUser);

      console.log("UPDATED", user);
      Alert.alert("Success", "Auth profile updated successfully!");

      // ⚠️ CATATAN: Jika lo juga update Firestore, panggil fungsi update Firestore di sini.
      // Setelah update Firestore, lo juga harus memanggil setState untuk data Firestore lo.
    } catch (error) {
      if (error instanceof FirebaseError) {
        Alert.alert("Error", `Failed to update profile: ${error.message}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Success", "You have been logged out.");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Logout Error:", error.code);
        Alert.alert("Logout Failed", `Could not log out: ${error.message}`);
      } else {
        console.error("General Logout Error:", error);
        Alert.alert(
          "Logout Failed",
          "An unknown error occurred during logout."
        );
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFF9EE",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          width: "100%",
          marginInline: 40,
        }}
      >
        <Image
          source={require("@/assets/images/my-penyanyi.png")}
          style={{
            width: 70,
            height: 70,
            aspectRatio: 1 / 1,
            borderRadius: 250,
            resizeMode: "contain",
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, color: "#4F2D27", fontWeight: "bold" }}>
            {user?.displayName || "No Name Provided"}
          </Text>
          <Text style={{ color: "#828282" }}>{user?.email}</Text>
        </View>
      </View>

      <View
        id="input__groups"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginInline: "auto",
          marginTop: 40,
          gap: 20,
        }}
      >
        <View style={{ width: "100%" }}>
          <Text style={{ color: "#E78454", fontSize: 18 }}>Username</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#E78454",
              width: "100%",
              paddingTop: 16,
              paddingBottom: 16,
              paddingLeft: 12,
              marginTop: 12,
              backgroundColor: "#FDF0DC",
              color: "#4f2d27B3",
              borderRadius: 5,
            }}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text style={{ color: "#E78454", fontSize: 18 }}>Email</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#E78454",
              width: "100%",
              paddingTop: 16,
              paddingBottom: 16,
              paddingLeft: 12,
              marginTop: 12,
              backgroundColor: "#FDF0DC",
              color: "#4f2d27B3",
              borderRadius: 5,
            }}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text style={{ color: "#E78454", fontSize: 18 }}>Password</Text>
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: "relative", marginTop: 12 }}
          >
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E78454",
                width: "100%",
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 12,
                backgroundColor: "#FDF0DC",
                color: "#4f2d27B3",
                borderRadius: 5,
              }}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={showPassword}
              value={password}
              onChangeText={setPassword}
            />
            {!showPassword ? (
              <AntDesign
                name="eye"
                size={24}
                color="#E78454"
                style={{
                  position: "absolute",
                  marginBlock: "auto",
                  right: 14,
                  bottom: 0,
                  top: 14,
                }}
              />
            ) : (
              <AntDesign
                name="eye-invisible"
                size={24}
                color="#E78454"
                style={{
                  position: "absolute",
                  marginBlock: "auto",
                  right: 14,
                  bottom: 0,
                  top: 14,
                }}
              />
            )}
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 30, flexDirection: "row", gap: 20 }}>
        <Pressable
          onPress={handleUpdateAuthProfile}
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
            Confirm Update
          </Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 16, flexDirection: "row", gap: 20 }}>
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            {
              width: "100%",
              padding: 14,
              borderWidth: 1,
              borderColor: "#EF4444",
              backgroundColor: "#ef44443b",
              borderRadius: 10,
            },
            pressed && {
              transform: [{ scale: 0.98 }],
              opacity: 0.8,
            },
          ]}
        >
          <Text style={{ fontSize: 22, textAlign: "center", color: "#EF4444" }}>
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../../../FirebaseConfig";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Required Fields", "Email and password are required.");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login Successful! 🎉", "Welcome back!");
      router.replace("/(screens)/(home)/home");
    } catch (error) {
      console.error("Firebase Auth Error:", error.code);

      let displayMessage = "An unexpected error occurred.";
      let alertTitle = "Login Failed";

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        displayMessage =
          "Invalid credentials. Please check your email and password.";
      } else if (error.code === "auth/invalid-email") {
        displayMessage = "Invalid email format.";
      } else if (error.code === "auth/user-disabled") {
        displayMessage = "This user account has been disabled.";
      }

      Alert.alert(alertTitle, displayMessage);
      setAuthMessage(displayMessage);
    }
  };

  const router = useRouter();
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFF9EE",
        paddingHorizontal: 20,
      }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", color: "#4F2D27" }}>
        Login
      </Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginInline: "auto",
        }}
      >
        <View
          id="input__groups"
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginInline: "auto",
            gap: 20,
          }}
        >
          <View style={{ width: "80%" }}>
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
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ width: "80%" }}>
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
        {authMessage && (
          <Text style={{ fontStyle: "italic", color: "red", marginTop: 16 }}>
            {authMessage}
          </Text>
        )}
        <View style={{ marginTop: 30, flexDirection: "row", gap: 20 }}>
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              {
                width: "80%",
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
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { auth } from "../../../FirebaseConfig";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const router = useRouter();
  const handleRegister = async () => {
    if (!email || !password || !username) {
      return Alert.alert("Required Fields", "Email and password are required.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Register Failed", "the password is missmatch.");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      await updateProfile(user, {
        displayName: username,
      });

      Alert.alert("Registration Successful! 🎉", "Your account has been created.");

      console.log("Registered User:", userCredential.user);
      router.replace("/(screens)/(home)/home");
    } catch (error) {
      let displayMessage = "An unexpected error occurred.";
      const alertTitle = "Registration Failed";

      if (error instanceof FirebaseError) {
        console.error("Firebase Registration Error:", error.code);

        if (error.code === "auth/email-already-in-use") {
          displayMessage = "This email address is already in use.";
        } else if (error.code === "auth/invalid-email") {
          displayMessage = "Invalid email format.";
        } else if (error.code === "auth/weak-password") {
          displayMessage = "Password is too weak. It must be at least 6 characters.";
        } else if (error.code === "auth/operation-not-allowed") {
          displayMessage = "Email/Password sign-up is not enabled. Check your Firebase console.";
        }
      } else {
        console.error("General Error:", error);
        displayMessage = "Could not connect to the server. Check your network.";
      }

      Alert.alert(alertTitle, displayMessage);
      setAuthMessage(displayMessage);
      // return;
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFF9EE",
        paddingHorizontal: 20,
      }}
      contentContainerStyle={{
        minHeight: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingVertical: 20,
      }}
    >
      <View style={{ width: "100%", alignItems: "center", gap: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#4F2D27" }}>Register</Text>

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
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={{ width: "80%" }}>
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
          <View style={{ width: "80%" }}>
            <Text style={{ color: "#E78454", fontSize: 18 }}>Password</Text>
            <Pressable onPress={() => setShowPassword(!showPassword)} style={{ position: "relative", marginTop: 12 }}>
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
          <View style={{ width: "80%" }}>
            <Text style={{ color: "#E78454", fontSize: 18 }}>Confirm Password</Text>
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: "relative", marginTop: 12 }}>
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
                secureTextEntry={showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              {!showConfirmPassword ? (
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

        {authMessage && <Text style={{ textAlign: "center", fontStyle: "italic", color: "red", marginTop: 16 }}>{authMessage}</Text>}
        <View style={{ marginTop: 30, flexDirection: "row", gap: 20 }}>
          <Pressable
            onPress={handleRegister}
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
            <Text style={{ fontSize: 22, textAlign: "center", color: "white" }}>Create an account</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PurchaseSuccessScreen() {
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      padding: 20,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "#4CAF50",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333333",
      marginBottom: 10,
    },
    message: {
      fontSize: 16,
      color: "#666666",
      textAlign: "center",
      marginBottom: 40,
      lineHeight: 24,
    },
    button: {
      backgroundColor: "#E78454",
      paddingVertical: 14,
      paddingHorizontal: 30,
      borderRadius: 25,
      width: "80%",
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "600",
    },
  });

  const handleGoHome = () => {
    router.replace("/(screens)/(home)/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="check" size={80} color="#FFFFFF" />
      </View>

      <Text style={styles.title}>Purchase Successful!</Text>

      <Text style={styles.message}>
        Thank you for your order. We have received your payment and will start
        processing it shortly.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleGoHome}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

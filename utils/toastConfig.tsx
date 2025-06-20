import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

const styles = StyleSheet.create({
  toast: {
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginHorizontal: 12,
  },
});

export const toastConfig = {
  success: ({ text1 }: BaseToastProps) => (
    <View style={[styles.toast, { backgroundColor: Colors.light.success }]}>
      <Ionicons
        name="checkmark-circle-outline"
        size={24}
        color="white"
        style={{ marginRight: 12 }}
      />
      <Text style={{ ...h3, color: "white" }}>{text1}</Text>
    </View>
  ),

  error: ({ text1 }: BaseToastProps) => (
    <View style={[styles.toast, { backgroundColor: "#FF4D4F" }]}>
      <Ionicons
        name="close-circle-outline"
        size={24}
        color="white"
        style={{ marginRight: 12 }}
      />
      <Text style={{ ...h3, color: "white" }}>{text1}</Text>
    </View>
  ),

  message: ({ text1 }: BaseToastProps) => (
    <View style={[styles.toast, { backgroundColor: Colors.light.primary }]}>
      <Ionicons
        name="chatbubble-ellipses-outline"
        size={24}
        color="white"
        style={{ marginRight: 12 }}
      />
      <Text style={{ ...h3, color: "white" }}>{text1}</Text>
    </View>
  ),
};

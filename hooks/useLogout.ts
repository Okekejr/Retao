import { useUserData } from "@/context/userContext";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const useLogout = () => {
  const router = useRouter();
  const { resetUserData } = useUserData();

  const logout = async () => {
    Alert.alert("Confirm", `You are signing out, Are you sure?`, [
      { text: "Cancel", style: "cancel" }, // Cancel action
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            // Remove the token from secure storage
            await SecureStore.deleteItemAsync("token");

            // delete user context data
            resetUserData();

            // Redirect to the login screen
            router.replace("/login/login");
          } catch (error) {
            console.error("Logout failed:", error);
          }
        },
      },
    ]);
  };

  return { logout };
};

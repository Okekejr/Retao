import { useUserData } from "@/context/userContext";
import { t } from "@/localization/t";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const useLogout = () => {
  const router = useRouter();
  const { resetUserData } = useUserData();

  const logout = async () => {
    Alert.alert(t("logout.confirmTitle"), t("logout.confirmMessage"), [
      { text: t("logout.cancel"), style: "cancel" },
      {
        text: t("logout.signOut"),
        style: "destructive",
        onPress: async () => {
          try {
            // Remove the token from secure storage
            await SecureStore.deleteItemAsync("token");

            // delete user context data
            resetUserData();

            // Redirect to the login screen
            router.replace("/home");
          } catch (error) {
            console.error("Logout failed:", error);
          }
        },
      },
    ]);
  };

  return { logout };
};

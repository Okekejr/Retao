import { BASE_URL } from "@/constants/random";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Alert } from "react-native";

export const useDeactivateAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const deactivate = async () => {
    Alert.alert("Confirm", `There's no going back, Are you sure?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Deactivate",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          setError(null);
          try {
            const token = await SecureStore.getItemAsync("token");

            if (!token) {
              throw new Error("User not authenticated.");
            }

            const res = await fetch(`${BASE_URL}users/me`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!res.ok) {
              const errData = await res.json();
              throw new Error(
                errData?.error || "Failed to deactivate account."
              );
            }

            await SecureStore.deleteItemAsync("token");

            router.replace("/login/login");
          } catch (err: any) {
            console.error("Deactivate error:", err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return { deactivate, loading, error };
};

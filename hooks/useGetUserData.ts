import { BASE_URL } from "@/constants/random";
import { userProfile, useUserData } from "@/context/userContext";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

export const useGetUserData = () => {
  const { updateUserForm } = useUserData();

  const refreshData = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) throw new Error("No token");

    const res = await fetch(`${BASE_URL}auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to fetch");

    if (res.ok) {
      const fields: (keyof userProfile)[] = [
        "id",
        "email",
        "name",
        "handle",
        "avatar",
        "bio",
        "location",
        "join_date",
        "stats",
        "listings",
        "borrowedItems",
        "current_step",
        "total_steps",
      ];
      fields.forEach((key) => {
        if (data[key] !== undefined) {
          updateUserForm(key, data[key]);
        }
      });
    } else {
      console.error("Failed to fetch user profile:", data.error);
    }
  };

  return { refreshData };
};

export const useRecipientProfile = (recipientId: string) => {
  return useQuery({
    queryKey: ["recipientProfile", recipientId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}users/${recipientId}`);
      if (!res.ok) throw new Error("Failed to fetch recipient profile");
      return res.json();
    },
    enabled: !!recipientId,
  });
};

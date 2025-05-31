import { BASE_URL } from "@/constants/random";
import { userProfile, useUserData } from "@/context/userContext";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

export const useGetUserData = async () => {
  const { updateUserForm } = useUserData();
  const token = await SecureStore.getItemAsync("token");

  return useQuery({
    queryKey: ["userData", token],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

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
    },
    staleTime: 1000 * 60 * 60 * 2,
  });
};

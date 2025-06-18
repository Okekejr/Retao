import { BASE_URL } from "@/constants/random";
import { userProfile, useUserData } from "@/context/userContext";
import { profileT } from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

const getAuthHeaders = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No token found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const useGetUserData = () => {
  const { updateUserForm } = useUserData();

  const refreshData = async () => {
    const headers = await getAuthHeaders();

    const res = await fetch(`${BASE_URL}auth/me`, { headers });

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
        "listing_limit",
        "stats",
        "subscription_plan",
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
  return useQuery<userProfile>({
    queryKey: ["recipientProfile", recipientId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}users/${recipientId}`);
      if (!res.ok) throw new Error("Failed to fetch recipient profile");
      return res.json();
    },
    enabled: !!recipientId,
  });
};

export const useBorrowerHistory = (itemId: string) => {
  return useQuery<profileT[]>({
    queryKey: ["borrowerHistory", itemId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}users/items/${itemId}/history`);
      if (!res.ok) throw new Error("Failed to fetch borrower history");
      return res.json();
    },
    enabled: !!itemId,
  });
};

export const useUserProfile = (userId: string | string[]) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}auth/me`, { headers });
      if (!res.ok) throw new Error("Failed to fetch user profile");
      const data = await res.json();
      return data;
    },
    enabled: !!userId,
  });
};

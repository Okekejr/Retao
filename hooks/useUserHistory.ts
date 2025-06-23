import { BASE_URL } from "@/constants/random";
import { UserHistoryResponse } from "@/types";
import { showToast } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { useGetUserData } from "./useGetUserData";

export type UpdateInfoPayload = {
  name?: string;
  email?: string;
  bio?: string;
};

const getAuthHeaders = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No token found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const useUserHistory = () => {
  return useQuery<UserHistoryResponse>({
    queryKey: ["userHistory"],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}history/getHistory`, { headers });
      if (!res.ok) throw new Error("Failed to fetch user history");
      return res.json();
    },
  });
};

export const useUpdatePersonalInfo = () => {
  const { refreshData } = useGetUserData();

  return useMutation({
    mutationFn: async (payload: UpdateInfoPayload) => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}users/update`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update info");
      }

      return data;
    },
    onSuccess: () => {
      showToast({
        type: "success",
        text1: "Profile updated",
        message: "Profile updated successfully",
      });

      refreshData();
    },
    onError: (error: any) => {
      showToast({
        type: "error",
        text1: "Profile update Failed",
        message:
          error.message || "Something went wrong. Please try again later.",
      });
    },
  });
};

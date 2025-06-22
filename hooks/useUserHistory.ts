import { BASE_URL } from "@/constants/random";
import { UserHistoryResponse } from "@/types";
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

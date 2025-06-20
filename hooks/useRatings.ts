import { BASE_URL } from "@/constants/random";
import { showToast } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

const getAuthHeaders = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No token found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const useSubmitRatings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rateeId,
      rating,
    }: {
      rateeId: string;
      rating: number;
    }) => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}ratings/rate`, {
        method: "POST",
        headers,
        body: JSON.stringify({ rateeId, rating }),
      });

      if (!res.ok) throw new Error("Failed to submit rating");
      return res.json();
    },
    onSuccess: () => {
      showToast({
        type: "success",
        text1: "Rating Submitted",
        message: "Thanks for rating the borrower!",
      });
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },

    onError: (error: any) => {
      showToast({
        type: "error",
        text1: "Rating Failed",
        message: error.message || "Something went wrong. Please try again.",
      });
    },
  });
};

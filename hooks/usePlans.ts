import { BASE_URL } from "@/constants/random";
import { SubscriptionPlan } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { useGetUserData } from "./useGetUserData";
import { showToast } from "@/utils";

const getAuthHeaders = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No token found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const useGetPlans = () => {
  return useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: async (): Promise<SubscriptionPlan[]> => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}plans`, {
        method: "GET",
        headers,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch plans");
      }

      return res.json(); // should return an array of plans
    },
  });
};

export const useSubscribeToPlan = () => {
  const { refreshData } = useGetUserData();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planId: string) => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}plans/subscribe`, {
        method: "POST",
        headers,
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to subscribe to plan");
      }

      return res.json();
    },
    onSuccess: () => {
      showToast({
        type: "success",
        text1: "Subscription Updated",
        message: "Your plan was updated successfully.",
      });
      refreshData();

      queryClient.invalidateQueries({
        predicate: (query) =>
          ["featuredListings", "listings", "listing"].includes(
            query.queryKey[0] as string
          ),
      });
    },
    onError: (error: any) => {
      showToast({
        type: "error",
        text1: "Subscription Failed",
        message:
          error.message || "Something went wrong. Please try again later.",
      });
    },
  });
};

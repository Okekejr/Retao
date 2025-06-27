import { BASE_URL } from "@/constants/random";
import { SubscriptionPlan } from "@/types";
import { showToast } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { useGetUserData } from "./useGetUserData";

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

export const useRevenueCatPlans = () => {
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { refreshData } = useGetUserData();

  useEffect(() => {
    const getOfferings = async () => {
      try {
        const result = await Purchases.getOfferings();
        if (result.current?.identifier === "preview-offering") {
          setIsPreviewMode(true);
        }
        if (result.current) {
          setOfferings(result.current);
        }
      } catch (e) {
        console.error("❌ Error fetching offerings:", e);
      } finally {
        setIsLoading(false);
      }
    };
    getOfferings();
  }, []);

  const fallbackBackendSync = async (entitlementId: string) => {
    try {
      const headers = await getAuthHeaders();
      await fetch(`${BASE_URL}plans/subscribe`, {
        method: "POST",
        headers,
        body: JSON.stringify({ planId: entitlementId }),
      });
      refreshData();
    } catch (e) {
      console.error("❌ Backend sync failed:", e);
    }
  };

  const handleSubscribe = async (pkg: PurchasesPackage) => {
    setIsPending(true);
    try {
      const purchase = await Purchases.purchasePackage(pkg);
      console.log("✅ Purchase successful:", purchase);

      const info = await Purchases.getCustomerInfo();
      const entitlementId = Object.keys(info.entitlements.active)[0];

      if (entitlementId) {
        showToast({
          type: "success",
          text1: "Subscribed Successfully",
          message: `You're now on the ${entitlementId} plan`,
        });
        setTimeout(() => fallbackBackendSync(entitlementId), 3000);
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.error("❌ Purchase failed:", e);
        showToast({
          type: "error",
          text1: "Subscription Failed",
          message: e.message || "Please try again.",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleRestore = async () => {
    try {
      const info = await Purchases.restorePurchases();
      const entitlementId = Object.keys(info.entitlements.active)[0];
      if (entitlementId) {
        showToast({
          type: "success",
          text1: "Restored Purchase",
          message: `Your ${entitlementId} plan has been restored.`,
        });
        await fallbackBackendSync(entitlementId);
      } else {
        showToast({
          type: "message",
          text1: "No Purchases Found",
          message: "You don't have any past purchases to restore.",
        });
      }
    } catch (e) {
      console.error("❌ Restore failed:", e);
      showToast({
        type: "error",
        text1: "Restore Failed",
        message: "An error occurred. Please try again.",
      });
    }
  };

  return {
    offerings,
    isLoading,
    isPending,
    isPreviewMode,
    handleSubscribe,
    handleRestore,
  };
};

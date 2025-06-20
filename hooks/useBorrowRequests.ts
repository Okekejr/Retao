import { BASE_URL } from "@/constants/random";
import { BorrowRequestByItem, BorrowRequestsResponse } from "@/types";
import { showToast } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

const getAuthHeaders = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No token found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const useIncomingBorrowRequests = () => {
  return useQuery<BorrowRequestsResponse["data"]>({
    queryKey: ["incomingBorrowRequests"],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}borrowRequests`, { headers });
      if (!res.ok) throw new Error("Failed to fetch borrow requests");
      const data = await res.json();
      return data.data;
    },
  });
};

export const useRequestToBorrow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId }: { itemId: string }) => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}borrowRequests`, {
        method: "POST",
        headers,
        body: JSON.stringify({ itemId }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to send borrow request");
      }
      return res.json();
    },
    onSuccess: () => {
      showToast({
        type: "success",
        text1: "Request to borrow",
        message: "Request sent to owner!",
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            "incomingBorrowRequests",
            "listings",
            "listing",
            "borrowerRequests",
            "borrowerHistory",
          ].includes(query.queryKey[0] as string),
      });
    },
  });
};

export const useUpdateBorrowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      requestId,
      status,
      dueDate,
    }: {
      requestId: string;
      status: "accepted" | "rejected" | "returned";
      dueDate?: string;
    }) => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}borrowRequests/${requestId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status, dueDate }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update borrow request");
      }
      return res.json();
    },
    onSuccess: (_data, variables) => {
      const { status } = variables;
      const statusToMessage = {
        accepted: "Request accepted",
        rejected: "Request rejected",
        returned: "Item marked as returned",
      };

      showToast({
        type: "success",
        text1: status,
        message: statusToMessage[status],
      });

      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            "incomingBorrowRequests",
            "listings",
            "listing",
            "borrowerRequests",
            "borrowerHistory",
          ].includes(query.queryKey[0] as string),
      });
    },
    onError: (error: Error) => {
      showToast({ type: "error", text1: "Error", message: error.message });
    },
  });
};

export const useBorrowerPendingRequests = () => {
  return useQuery<BorrowRequestsResponse["data"]>({
    queryKey: ["borrowerRequests"],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${BASE_URL}borrowRequests/borrower`, {
        headers,
      });
      if (!res.ok) throw new Error("Failed to fetch borrower's requests");
      const data = await res.json();
      return data.data;
    },
  });
};

export const useBorrowRequestByItem = (itemId: string) =>
  useQuery<BorrowRequestByItem>({
    queryKey: ["borrowRequestByItem", itemId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}borrowRequests/item/${itemId}`);
      if (!res.ok) throw new Error("Failed to fetch borrow request");
      const data = await res.json();
      return data;
    },
    enabled: !!itemId,
  });

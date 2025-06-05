import { BASE_URL } from "@/constants/random";
import { BorrowRequestsResponse } from "@/types";
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
      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            "incomingBorrowRequests",
            "listings",
            "listing",
            "borrowerRequests",
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
      status: "accepted" | "rejected";
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            "incomingBorrowRequests",
            "listings",
            "listing",
            "borrowerRequests",
          ].includes(query.queryKey[0] as string),
      });
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

import { BASE_URL } from "@/constants/random";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await SecureStore.getItemAsync("token");

      if (!token) {
        throw new Error("User not authenticated.");
      }

      const response = await fetch(`${BASE_URL}listings/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to delete listing");
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          ["favorites", "listings", "listing", "isFavorited"].includes(
            query.queryKey[0] as string
          ),
      });
    },
  });
};

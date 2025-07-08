import { BASE_URL } from "@/constants/random";
import { ListingsT } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FAVORITES_BASE_URL = `${BASE_URL}favorites`;

// Helper function to handle fetch and errors
const fetchJSON = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "API error");
  }
  return res.json();
};

// ✅ Get all favorites for a user
export const useFavorites = (isLoggedIn: boolean, userId?: string) => {
  return useQuery<ListingsT, Error>({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      if (!userId) return [];
      return fetchJSON(`${FAVORITES_BASE_URL}/${userId}`);
    },
    enabled: isLoggedIn && !!userId,
  });
};

// ✅ Check if a specific listing is favorited by the user
export const useIsFavorited = (user_id?: string, listing_id?: string) => {
  return useQuery({
    queryKey: ["isFavorited", user_id, listing_id],
    queryFn: async () => {
      const res = await fetchJSON(
        `${FAVORITES_BASE_URL}/check?user_id=${user_id}&listing_id=${listing_id}`
      );
      return res.favorited as boolean;
    },
    enabled: !!user_id && !!listing_id,
  });
};

// ✅ Add a listing to favorites
export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      user_id,
      listing_id,
    }: {
      user_id: string;
      listing_id: string;
    }) => {
      return fetchJSON(FAVORITES_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, listing_id }),
      });
    },
    onSuccess: (_data, { user_id, listing_id }) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          ["favorites", "listings", "listing", "isFavorited"].includes(
            query.queryKey[0] as string
          ),
      });
      queryClient.invalidateQueries({
        queryKey: ["isFavorited", user_id, listing_id],
      });
    },
  });
};

// ✅ Remove a listing from favorites
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      user_id,
      listing_id,
    }: {
      user_id: string;
      listing_id: string;
    }) => {
      return fetchJSON(FAVORITES_BASE_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, listing_id }),
      });
    },
    onSuccess: (_data, { user_id, listing_id }) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          ["favorites", "listings", "listing", "isFavorited"].includes(
            query.queryKey[0] as string
          ),
      });
      queryClient.invalidateQueries({
        queryKey: ["isFavorited", user_id, listing_id],
      });
    },
  });
};

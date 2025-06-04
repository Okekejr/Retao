import { BASE_URL } from "@/constants/random";
import { Listing, ListingsT } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetListings = (
  location?: string,
  userId?: string,
  limit?: string
) => {
  return useQuery<ListingsT, Error>({
    queryKey: ["listings", location, userId, limit],
    queryFn: async () => {
      const url = new URL(`${BASE_URL}listings`);

      if (location) {
        url.searchParams.append("location", location);
      }
      if (userId) {
        url.searchParams.append("userId", userId);
      }
      if (limit) {
        url.searchParams.append("limit", limit);
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await response.json();
        return data ?? [];
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });
};

export const useGetListingById = (id: string) => {
  return useQuery<Listing, Error>({
    queryKey: ["listing", id],
    queryFn: async () => {
      try {
        const url = new URL(`${BASE_URL}listings/${id}`);

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data = await res.json();
        return data ?? null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });
};

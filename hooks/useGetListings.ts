import { BASE_URL } from "@/constants/random";
import { Listing, ListingsT, SearchListingsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetListings = (
  enabled: boolean = true,
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
    enabled: enabled,
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

export const useGetFeaturedListings = (location?: string, limit?: string) => {
  return useQuery<ListingsT, Error>({
    queryKey: ["featuredListings", location, limit],
    queryFn: async () => {
      const url = new URL(`${BASE_URL}listings/featured`);

      if (location) {
        url.searchParams.append("location", location);
      }

      if (limit) {
        url.searchParams.append("limit", limit);
      }

      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Failed to fetch featured listings");
        }

        const data = await response.json();
        return data ?? [];
      } catch (error) {
        console.error("Error fetching featured listings:", error);
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });
};

export const useSearchListings = (query: string) => {
  return useQuery<SearchListingsResponse["data"]>({
    queryKey: ["searchListings", query],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}listings/search?query=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Failed to search listings");
      const data = await res.json();
      return data.data;
    },
    enabled: !!query,
    refetchOnWindowFocus: false,
  });
};

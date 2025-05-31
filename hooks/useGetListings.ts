import { BASE_URL } from "@/constants/random";
import { ListingsT } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetListings = (location?: string, userId?: string) => {
  return useQuery<ListingsT, Error>({
    queryKey: ["listings", location, userId],
    queryFn: async () => {
      const url = new URL(`${BASE_URL}listings`);

      if (location) {
        url.searchParams.append("location", location);
      }
      if (userId) {
        url.searchParams.append("userId", userId);
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
    staleTime: 1000 * 60 * 60 * 2,
    refetchOnWindowFocus: true,
  });
};

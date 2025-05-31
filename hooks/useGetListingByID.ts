import { BASE_URL } from "@/constants/random";
import { Listing } from "@/types";
import { useQuery } from "@tanstack/react-query";

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
    staleTime: 1000 * 60 * 60 * 2,
  });
};

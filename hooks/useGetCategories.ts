import { BASE_URL } from "@/constants/random";
import { Categories } from "@/types";
import { useQuery } from "@tanstack/react-query";

// 1. Get all categories
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}categories`);
      const data = await res.json();
      return data.data as Categories;
    },
    staleTime: 3600000, // Cache data for 1 hour
    refetchOnWindowFocus: false,
  });
};

// 2. Get single category by ID
export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}categories/${id}`);
      const data = await res.json();
      return data.data as {
        id: string;
        title: string;
        icon: string;
        description: string;
      };
    },
    enabled: !!id,
  });
};

// 3. Get listings under a category
export const useGetListingsByCategory = (id: string) => {
  return useQuery({
    queryKey: ["categoryListings", id],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}categories/${id}/listings`);
      const data = await res.json();
      return data.data as {
        id: string;
        title: string;
        description: string;
        distance: string;
        image: string[];
        favorited?: boolean;
      }[];
    },
    enabled: !!id,
  });
};

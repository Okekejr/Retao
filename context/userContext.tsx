import { BASE_URL } from "@/constants/random";
import * as SecureStore from "expo-secure-store";
import { createContext, FC, useContext, useEffect, useState } from "react";

export interface userProfile {
  id: string;
  email: string;
  name: string;
  handle: string;
  avatar: any;
  bio: string;
  location: string;
  join_date: string;
  subscription_plan: string;
  listing_limit: number;
  stats: {
    listed: number;
    borrowed: number;
    rating: number;
    reviewsCount: number;
  };
  listings: {
    id: any;
    title: any;
    description: any;
    distance: any;
    image: any;
    favorited: boolean;
  }[];
  borrowedItems: {
    id: any;
    title: any;
    description: any;
    distance: any;
    image: any;
    favorited: boolean;
  }[];
  total_steps: number;
  current_step: number;
}

const initialState: userProfile = {
  id: "",
  email: "",
  name: "",
  handle: "",
  avatar: "",
  bio: "",
  location: "",
  join_date: "",
  subscription_plan: "",
  listing_limit: 5,
  current_step: 1,
  total_steps: 4,
  stats: {
    listed: 0,
    borrowed: 0,
    rating: 0,
    reviewsCount: 0,
  },
  listings: [],
  borrowedItems: [],
};

interface userContext {
  user: {
    userData: userProfile;
    updateUserForm: (key: keyof userProfile, value: any) => void;
    resetUserData: () => void;
    isUserReady: boolean;
  } | null;
}

const UserContext = createContext<userContext["user"] | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<userProfile>(initialState);
  const [isUserReady, setIsUserReady] = useState(false);

  const resetUserData = () => setUserData(initialState);

  const updateUserForm = <K extends keyof userProfile>(
    key: K,
    value: userProfile[K]
  ) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const hydrateUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token) return setIsUserReady(true); // guest

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const res = await fetch(`${BASE_URL}auth/me`, { headers });
        const data = await res.json();

        if (res.ok) {
          await SecureStore.setItemAsync("user_id", data.id);

          const fields: (keyof userProfile)[] = [
            "id",
            "email",
            "name",
            "handle",
            "avatar",
            "bio",
            "location",
            "join_date",
            "listing_limit",
            "stats",
            "subscription_plan",
            "listings",
            "borrowedItems",
            "current_step",
            "total_steps",
          ];
          fields.forEach((key) => {
            if (data[key] !== undefined) {
              updateUserForm(key, data[key]);
            }
          });
        }
      } catch (e) {
        console.error("User hydration failed", e);
      } finally {
        setIsUserReady(true);
      }
    };

    hydrateUser();
  }, []);

  if (!isUserReady) return null;

  return (
    <UserContext.Provider
      value={{
        userData,
        resetUserData,
        updateUserForm,
        isUserReady,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useListing must be used within a ListingProvider");
  }
  return context;
};

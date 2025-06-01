import { createContext, FC, useContext, useState } from "react";

export interface userProfile {
  id: string;
  email: string;
  name: string;
  handle: string;
  avatar: any;
  bio: string;
  location: string;
  join_date: string;
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
  } | null;
}

const UserContext = createContext<userContext["user"] | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<userProfile>(initialState);

  const resetUserData = () => setUserData(initialState);

  const updateUserForm = <K extends keyof userProfile>(
    key: K,
    value: userProfile[K]
  ) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <UserContext.Provider value={{ userData, resetUserData, updateUserForm }}>
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

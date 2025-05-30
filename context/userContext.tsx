import { createContext, FC, useContext, useState } from "react";

interface userProfile {
  name: string;
  handle: string;
  avatar: any;
  bio: string;
  location: string;
  total_steps: number;
  current_step: number;
}

const initialState: userProfile = {
  name: "",
  handle: "",
  avatar: "",
  bio: "",
  location: "",
  current_step: 1,
  total_steps: 4,
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

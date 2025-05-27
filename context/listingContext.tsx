import { createContext, FC, useContext, useState } from "react";

interface ListingData {
  category: string;
  images: string[];
  location: string;
  title: string;
  description: string;
  availability: string;
  total_steps: number;
  current_step: number;
}

const initialState: ListingData = {
  category: "",
  images: [],
  location: "",
  title: "",
  description: "",
  availability: "",
  current_step: 1,
  total_steps: 4,
};

const ListingContext = createContext<{
  formData: ListingData;
  updateFormData: (key: keyof ListingData, value: any) => void;
} | null>(null);

interface ListingProviderProps {
  children: React.ReactNode;
}

export const ListingProvider: FC<ListingProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<ListingData>(initialState);

  const updateFormData = <K extends keyof ListingData>(
    key: K,
    value: ListingData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ListingContext.Provider value={{ formData, updateFormData }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error("useListing must be used within a ListingProvider");
  }
  return context;
};

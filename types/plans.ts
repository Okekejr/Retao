export type planIdType = "free" | "pro" | "unlimited";

export type SubscriptionPlan = {
  id: planIdType;
  name: string;
  description: string;
  price: number;
  maxListings: number;
  features?: string[];
};

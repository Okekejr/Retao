import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (error) {
    console.log("Error getting token:", error);
    return null;
  }
};

export type profileItemsT = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  content?: string;
  hrefLink?: any;
  func?: boolean;
}[];

export const profileItems: profileItemsT = [
  {
    label: "Account Settings",
    icon: "settings-outline",
    content: "settings",
  },
  {
    label: "History",
    icon: "time-outline",
    hrefLink: "/history/history",
  },
  {
    label: "Help & FAQs",
    icon: "help-circle-outline",
  },
  {
    label: "Contact Support",
    icon: "chatbubble-ellipses-outline",
  },
  {
    label: "Log Out",
    icon: "log-out-outline",
    func: true,
  },
];

export const AccountSettings: profileItemsT = [
  {
    label: "Personal information",
    icon: "person-outline",
    hrefLink: "/settings/personalInfo",
  },
  {
    label: "Login & Security",
    icon: "shield-outline",
    hrefLink: "/settings/loginSecurity",
  },
  {
    label: "Manage Subscriptions",
    icon: "checkmark-done-circle-outline",
    hrefLink: "/subscription/subPlans",
  },
  // {
  //   label: "Notifications",
  //   icon: "notifications-outline",
  // },
];

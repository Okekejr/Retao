import { Ionicons } from "@expo/vector-icons";

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
  },
  {
    label: "Login & Security",
    icon: "shield-outline",
  },
  {
    label: "Notifications",
    icon: "notifications-outline",
  },
];

import { t } from "@/localization/t";
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

export const getProfileItems = (): profileItemsT => [
  {
    label: t("profile.accountSettings"),
    icon: "settings-outline",
    content: "settings",
  },
  {
    label: t("profile.history"),
    icon: "time-outline",
    hrefLink: "/history/history",
  },
  {
    label: t("profile.help"),
    icon: "help-circle-outline",
  },
  {
    label: t("profile.support"),
    icon: "chatbubble-ellipses-outline",
  },
  {
    label: t("profile.logout"),
    icon: "log-out-outline",
    func: true,
  },
];

export const getAccountSettings = (): profileItemsT => [
  {
    label: t("accountSettings.personal"),
    icon: "person-outline",
    hrefLink: "/settings/personalInfo",
  },
  {
    label: t("accountSettings.login"),
    icon: "shield-outline",
    hrefLink: "/settings/loginSecurity",
  },
  {
    label: t("accountSettings.subs"),
    icon: "checkmark-done-circle-outline",
    hrefLink: "/subscription/subPlans",
  },
  // {
  //   label: "Notifications",
  //   icon: "notifications-outline",
  // },
];

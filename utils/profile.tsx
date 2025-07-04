import { t } from "@/localization/t";
import { Ionicons } from "@expo/vector-icons";

export type profileItemsT = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  content?: string;
  hrefLink?: any;
  func?: boolean;
  href?: string;
  mail?: boolean;
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
    href: "https://www.okekedev.com",
  },
  {
    label: t("profile.privacyPolicy"),
    icon: "document-text-outline",
    href: "https://docs.google.com/document/d/1PbrlztJt6Rkb2lUXm7vAXWbaVM1SU8FAOSLHJLc0U9g/edit?tab=t.0",
  },
  {
    label: t("profile.termsOfUse"),
    icon: "document-outline",
    href: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
  },
  {
    label: t("profile.support"),
    icon: "chatbubble-ellipses-outline",
    mail: true,
  },
  {
    label: t("profile.logout"),
    icon: "log-out-outline",
    func: true,
  },
];

export const getLoggedOutProfileItems = (): profileItemsT => [
  {
    label: t("profile.accountSettings"),
    icon: "settings-outline",
    content: "settings",
  },
  {
    label: t("profile.help"),
    icon: "help-circle-outline",
    href: "https://www.okekedev.com",
  },
  {
    label: t("profile.privacyPolicy"),
    icon: "document-text-outline",
    href: "https://docs.google.com/document/d/1PbrlztJt6Rkb2lUXm7vAXWbaVM1SU8FAOSLHJLc0U9g/edit?tab=t.0",
  },
  {
    label: t("profile.termsOfUse"),
    icon: "document-outline",
    href: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",
  },
  {
    label: t("profile.support"),
    icon: "chatbubble-ellipses-outline",
    mail: true,
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

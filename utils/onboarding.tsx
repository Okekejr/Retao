import { userProfile } from "@/context/userContext";
import { t } from "@/localization/t";
import { IntroUtilsT } from "./intro";

export const getOnboardingIntroUtils = (): IntroUtilsT => [
  {
    key: "nameHandle",
    title: t("onboardingIntro.nameHandle.title"),
    desc: t("onboardingIntro.nameHandle.desc"),
    image: require("../assets/img/write.png"),
  },
  {
    key: "avatar",
    title: t("onboardingIntro.avatar.title"),
    desc: t("onboardingIntro.avatar.desc"),
    image: require("../assets/img/avatar.png"),
  },
  {
    key: "bioLocation",
    title: t("onboardingIntro.bioLocation.title"),
    desc: t("onboardingIntro.bioLocation.desc"),
    image: require("../assets/img/loc.png"),
  },
];

// Define the valid onboarding routes in order
export const onboardingRoutes = [
  "/signup/onBoarding",
  "/signup/signupForm",
  "/signup/signupAvatar",
  "/signup/signupBioLoc",
  "/signup/signupReview",
] as const;

export type OnboardingRoute = (typeof onboardingRoutes)[number];

// Get the next route based on current step
export const getNextIncompleteStep = (step: number): OnboardingRoute =>
  onboardingRoutes[step] || "/signup/onBoarding";

// Determine if the profile is complete
export const isProfileComplete = (userData: Partial<userProfile>) =>
  !!userData.name &&
  !!userData.handle &&
  !!userData.avatar &&
  !!userData.bio &&
  !!userData.location;

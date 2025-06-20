import { userProfile } from "@/context/userContext";
import { IntroUtilsT } from "./intro";

export const OnboardingIntroUtils: IntroUtilsT = [
  {
    key: "nameHandle",
    title: "Your Name & Handle",
    desc: "We’ll use this to personalize your profile and make it easier for others to find you.",
    image: require("../assets/img/write.png"),
  },
  {
    key: "avatar",
    title: "Add a Friendly Photo",
    desc: "A picture helps others trust you. It can be a selfie or a fun avatar!",
    image: require("../assets/img/avatar.png"),
  },
  {
    key: "bioLocation",
    title: "Share a Little About You",
    desc: "Tell the community who you are and where you're based. Just enough to connect!",
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

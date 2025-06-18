import { JSX } from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

export const getIconName = (
  routeName: string,
  focused: boolean
): JSX.Element => {
  const iconStyle: StyleProp<ImageStyle> = {
    width: 24,
    height: 24,
    tintColor: focused ? "#1A1A1A" : "grey",
  };

  switch (routeName) {
    case "home":
      return (
        <Image
          source={require("../assets/icons/Home.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "wishlist":
      return (
        <Image
          source={require("../assets/icons/Heart.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "listings":
      return (
        <Image
          source={require("../assets/icons/appLogo.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "messages":
      return (
        <Image
          source={require("../assets/icons/Message.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "profile":
      return (
        <Image
          source={require("../assets/icons/User.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    default:
      return (
        <Image
          source={require("../assets/icons/Home.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
  }
};

export const getStatusStyle = (status: string) => {
  switch (status) {
    case "accepted":
      return { color: "#4CAF50" }; // green
    case "rejected":
      return { color: "#F44336" }; // red
    case "pending":
    default:
      return { color: "#FFA000" }; // amber/orange
  }
};

const SUBSCRIPTION_PLANS = [
  { id: "free", label: "Free", color: "#4F46E5" },
  { id: "pro", label: "Pro", color: "#000000" },
  { id: "unlimited", label: "Unlimited", color: "#D4AF37" },
];

export const getPlanColor = (planId: string): string => {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
  return plan ? plan.color : "#4F46E5";
};

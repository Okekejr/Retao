import { Ionicons } from "@expo/vector-icons";

export const getIconName = (
  routeName: string,
  focused: boolean
): keyof typeof Ionicons.glyphMap => {
  switch (routeName) {
    case "home":
      return focused ? "home" : "home-outline";
    default:
      return "help";
  }
};

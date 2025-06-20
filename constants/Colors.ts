/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#1A1A1A",
    textSecondary: "#666",
    textTertiery: "#444",
    accent: "#5A9CFF",
    accentAlt: "#6DD3C5",
    background: "#FAFAF7",
    surfaceArea: "#FFFFFF",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#4F46E5",
    success: "#24f07d",
    muted: "#C8C8C8",
  },
  planColor: {
    free: "#4F46E5",
    pro: "#000000",
    unlimited: "#D4AF37",
  },
  dark: {
    text: "#FFFFFF",
    textSecondary: "#AAAAAA", // Softer gray for contrast
    textTertiery: "#888888", // Even softer for subtle elements
    accent: "#5AB6FF", // Softer neon blue
    accentAlt: "#4BC8B4", // Muted teal
    background: "#121212", // True dark
    surfaceArea: "#1E1E1E", // Slightly lighter surface
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#4F46E5", // Electric blue
    success: "#3CF78F", // Balanced green
    muted: "#C8C8C8",
  },
};

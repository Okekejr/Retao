import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/userThemeContext";

export const useThemeColorValue = (
  overrides: { light?: string; dark?: string },
  name: keyof typeof Colors.light
): string => {
  const { theme } = useTheme();

  if (theme === "light" && overrides.light) {
    return overrides.light;
  }

  if (theme === "dark" && overrides.dark) {
    return overrides.dark;
  }

  return Colors[theme][name];
};

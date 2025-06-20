import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/userThemeContext";

export const useThemeColor = (p0: {}, name: string) => {
  const { theme } = useTheme();

  // This function lets you get any color from the current theme
  const getColor = (colorName: keyof typeof Colors.light) => {
    return Colors[theme][colorName];
  };

  return getColor;
};

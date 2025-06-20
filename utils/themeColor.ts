import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export const themeColor = (
  name: keyof typeof Colors.light & keyof typeof Colors.dark
) => {
  const getColor = useThemeColor({}, name);
  return getColor(name);
};

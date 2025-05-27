import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface BackIconProps {
  color?: string;
  size?: number;
  iconName?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
}

export const BackButton = ({
  color = "#fff",
  size = 24,
  iconName = "arrow-back",
  style,
}: BackIconProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <TouchableOpacity style={[styles.icon, style]} onPress={handleBack}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 8,
    borderRadius: 20,
  },
});

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

interface BackIconProps {
  color?: string;
  size?: number;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const BackButton = ({
  color = "#fff",
  size = 24,
  iconName = "arrow-back",
}: BackIconProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <TouchableOpacity style={styles.icon} onPress={handleBack}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
});

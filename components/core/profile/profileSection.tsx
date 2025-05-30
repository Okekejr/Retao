import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

interface ProfileSectionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

export const ProfileSection = ({
  onPress,
  icon,
  label,
}: ProfileSectionProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.7 }]}
    >
      <View style={styles.card}>
        <Ionicons name={icon} size={22} color="#444" />
        <CustomText style={styles.label}>{label}</CustomText>
        <Ionicons name="chevron-forward" size={20} color="#aaa" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.light.surfaceArea,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#222",
  },
});

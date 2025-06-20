import CustomText from "@/components/ui/customText";
import { themeColor } from "@/utils";
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
  const text = themeColor("text");
  const bg = themeColor("surfaceArea");

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.7 }]}
    >
      <View style={[styles.card, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={24} color={text} />
        <CustomText style={[styles.label, { color: text }]}>{label}</CustomText>
        <Ionicons name="chevron-forward" size={20} color={text} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
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
  },
});

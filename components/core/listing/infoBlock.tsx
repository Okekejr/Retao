import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

interface InfoBlockProps {
  label: string;
  value: string;
}

export const InfoBlock = ({ label, value }: InfoBlockProps) => {
  return (
    <View style={styles.infoBlock}>
      <CustomText style={styles.label}>{label}</CustomText>
      <CustomText style={styles.value}>{value || "—"}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10,
  },
  label: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
});

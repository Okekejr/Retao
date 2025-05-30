import CustomText from "@/components/ui/customText";
import { StyleSheet, View } from "react-native";

interface CustomStatsProps {
  label: string;
  value: any;
}

export const CustomStats = ({ label, value }: CustomStatsProps) => {
  return (
    <View style={styles.stat}>
      <CustomText style={styles.statValue}>{value}</CustomText>
      <CustomText style={styles.statLabel}>{label}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
  },
});

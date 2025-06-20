import CustomText from "@/components/ui/customText";
import { themeColor } from "@/utils";
import { StyleSheet, View } from "react-native";

interface CustomStatsProps {
  label: string;
  value: any;
}

export const CustomStats = ({ label, value }: CustomStatsProps) => {
  const textSecondary = themeColor("textSecondary");
  const text = themeColor("text");

  return (
    <View style={styles.stat}>
      <CustomText style={[styles.statValue, { color: text }]}>
        {value}
      </CustomText>
      <CustomText style={[styles.statLabel, { color: textSecondary }]}>
        {label}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
  },
});

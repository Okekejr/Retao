import { Colors } from "@/constants/Colors";
import { DimensionValue, StyleSheet, View } from "react-native";

interface CustomProgressBarProps {
  progressPercentage: DimensionValue;
}

export const CustomProgressBar = ({
  progressPercentage,
}: CustomProgressBarProps) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressFill, { width: progressPercentage }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 8,
    backgroundColor: "#eee",
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.light.primary,
  },
});

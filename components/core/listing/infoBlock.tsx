import CustomText from "@/components/ui/customText";
import { themeColor } from "@/utils";
import { StyleSheet, View } from "react-native";

interface InfoBlockProps {
  label: string;
  value: string;
}

export const InfoBlock = ({ label, value }: InfoBlockProps) => {
  const textSec = themeColor("textSecondary");
  const text = themeColor("text");

  return (
    <View style={styles.infoBlock}>
      <CustomText style={[styles.label, { color: textSec }]}>
        {label}
      </CustomText>
      <CustomText style={[styles.value, { color: text }]}>
        {value || "—"}
      </CustomText>
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
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
});

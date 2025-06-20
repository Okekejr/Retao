import { h3 } from "@/constants/random";
import { themeColor } from "@/utils";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "./customText";

interface SettingsItemProps {
  header: string;
  subHeader: string;
  btnText: string;
  func: () => void;
  show?: boolean;
}

export const SettingsItem = ({
  header,
  subHeader,
  btnText,
  func,
  show,
}: SettingsItemProps) => {
  const textSec = themeColor("textSecondary");
  const text = themeColor("text");

  return (
    <View style={styles.itemContainer}>
      <View style={{ gap: 5 }}>
        <CustomText style={[h3, { color: text }]}>{header}</CustomText>
        <CustomText style={{ color: textSec }}>{subHeader}</CustomText>
      </View>

      <Pressable onPress={func}>
        <CustomText style={[styles.btnText, { color: text }]}>
          {show ? "Cancel" : btnText}
        </CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
});

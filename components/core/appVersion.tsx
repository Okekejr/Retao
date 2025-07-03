import { themeColor } from "@/utils";
import * as Application from "expo-application";
import { FC } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import CustomText from "../ui/customText";

interface AppVersionProps {
  style?: StyleProp<TextStyle>;
}

export const AppVersion: FC<AppVersionProps> = ({ style }) => {
  const text = themeColor("text");

  return (
    <CustomText style={[styles.ctaSubtitle, { color: text }, style]}>
      Version {Application.nativeApplicationVersion} (
      {Application.nativeBuildVersion})
    </CustomText>
  );
};

const styles = StyleSheet.create({
  ctaSubtitle: {
    fontSize: 13,
    color: "#f0f0f0",
  },
});

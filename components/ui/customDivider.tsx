import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import CustomText from "./customText";

interface Props {
  text?: string;
  style?: StyleProp<ViewStyle>;
}

export const CustomDivider = ({ text, style }: Props) => {
  return (
    <View style={[styles.dividerContainer, style]}>
      <View style={styles.line} />
      {text && <CustomText style={styles.text}>{text}</CustomText>}
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#7A7A7A",
  },
});

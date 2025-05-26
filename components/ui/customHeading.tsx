import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

interface CustomHeadingProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

const CustomHeading: FC<CustomHeadingProps> = ({ style, ...props }) => {
  return <Text style={[styles.defaultFont, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "Satoshi-Bold",
    fontSize: 32,
    letterSpacing: 0.5,
    color: "#1A1A1A",
    textTransform: "capitalize",
  },
});

export default CustomHeading;

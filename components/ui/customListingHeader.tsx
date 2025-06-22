import { h2 } from "@/constants/random";
import { themeColor } from "@/utils";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import CustomText from "./customText";

interface CustomLisitngHeaderProps {
  heading: string;
  subHeading: string;
  style?: StyleProp<TextStyle>;
}

export const CustomListingHeader = ({
  heading,
  subHeading,
  style,
}: CustomLisitngHeaderProps) => {
  const textSec = themeColor("textSecondary");
  const text = themeColor("text");

  return (
    <View style={{ marginVertical: 30, gap: 5 }}>
      <CustomText style={[styles.heading, h2, { color: text }, style]}>
        {heading}
      </CustomText>
      <CustomText style={[styles.subheading, { color: textSec }, style]}>
        {subHeading}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    lineHeight: 30,
  },
  subheading: {
    fontSize: 16,
  },
});

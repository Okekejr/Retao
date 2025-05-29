import { Colors } from "@/constants/Colors";
import { h2 } from "@/constants/random";
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
  return (
    <View style={{ marginVertical: 30, gap: 5 }}>
      <CustomText style={[styles.heading, h2, style]}>{heading}</CustomText>
      <CustomText style={[styles.subheading, style]}>{subHeading}</CustomText>
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
    color: Colors.light.textSecondary,
  },
});

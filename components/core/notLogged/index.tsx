import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface NotLoggedProps {
  title: string;
  subTitle?: string;
  btnText?: string;
  func: () => void;
}

export const NotLogged = ({
  title,
  subTitle,
  btnText = t("btnTexts.login"),
  func,
}: NotLoggedProps) => {
  const text = themeColor("text");
  const textSecondary = themeColor("textSecondary");

  return (
    <>
      <InnerContainer style={{ gap: 45, marginTop: 50 }}>
        <View style={styles.container}>
          <CustomHeading style={[styles.heading, { color: text }]}>
            {title}
          </CustomHeading>
          <CustomText style={[styles.description, { color: textSecondary }]}>
            {subTitle}
          </CustomText>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={func}>
          <CustomText style={styles.buttonText}>{btnText}</CustomText>
        </TouchableOpacity>
      </InnerContainer>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    letterSpacing: 0.5,
    textTransform: "none",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  container: {
    gap: 10,
    maxWidth: 320,
  },
  nextButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});

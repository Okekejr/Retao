import { Colors } from "@/constants/Colors";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "./customText";

interface ListingButtonsProps {
  handleBack: () => void;
  handleNext: () => void;
  disabled?: boolean;
  nextBtnTitle?: string;
  backBtnTitle?: string;
  styleBackText?: StyleProp<TextStyle>;
}

export const ListingButtons = ({
  handleBack,
  handleNext,
  disabled,
  nextBtnTitle = t("btnTexts.next"),
  backBtnTitle = t("btnTexts.back"),
  styleBackText,
}: ListingButtonsProps) => {
  const text = themeColor("text");

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={handleBack}>
        <CustomText style={[styles.backText, { color: text }, styleBackText]}>
          {backBtnTitle}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={disabled}
        style={[styles.nextButton, disabled && styles.disabledButton]}
        onPress={handleNext}
      >
        <CustomText style={[styles.buttonText, { color: text }]}>
          {nextBtnTitle}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  nextButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: Colors.light.muted,
  },
});

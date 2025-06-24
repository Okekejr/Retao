import { useLanguage } from "@/context/languageContext";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomText from "../ui/customText";

interface LanguageSwitcherProps {
  onClose: () => void;
}

const LanguageSwitcher = ({ onClose }: LanguageSwitcherProps) => {
  const { language, availableLanguages, setLanguage, getLanguageName } =
    useLanguage();
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const bg = themeColor("surfaceArea");
  const text = themeColor("text");

  const togglePicker = () => setIsPickerVisible((prev) => !prev);

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang as any);
    setIsPickerVisible(false);
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      <View style={[styles.categoryBox, { backgroundColor: bg }]}>
        <Ionicons name="language-outline" size={22} color={text} />
        <CustomText style={[styles.label, { color: text }]}>
          {t("accountSettings.language")}
        </CustomText>

        <TouchableOpacity onPress={togglePicker} style={styles.pickerButton}>
          <CustomText style={[styles.pickerText, { color: text }]}>
            {getLanguageName(language)}
          </CustomText>
          <Ionicons
            name={isPickerVisible ? "chevron-up" : "chevron-down"}
            size={18}
            color={text}
          />
        </TouchableOpacity>
      </View>

      {isPickerVisible && (
        <View style={styles.pickerList}>
          {availableLanguages.map((lang) => (
            <TouchableOpacity
              key={lang}
              onPress={() => {
                handleLanguageSelect(lang);
                onClose();
              }}
              style={styles.pickerItem}
            >
              {language === lang ? (
                <Ionicons
                  name="checkmark-sharp"
                  size={15}
                  color="#fff"
                  style={{ marginRight: 5 }}
                />
              ) : (
                <View style={{ width: 15, marginRight: 5 }} />
              )}
              <Text style={styles.pickerItemText}>{getLanguageName(lang)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerText: {
    marginRight: 5,
    fontSize: 16,
  },
  pickerList: {
    position: "absolute",
    bottom: 60,
    right: 1,
    backgroundColor: "#444",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 200,
    zIndex: 10,
  },
  pickerItem: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  pickerItemText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LanguageSwitcher;

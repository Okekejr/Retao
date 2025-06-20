import { useTheme } from "@/context/userThemeContext";
import { themeColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomText from "../ui/customText";

type ColorModeT = "light" | "dark" | "system";
const colorModes: ColorModeT[] = ["light", "dark", "system"];

const ColorSwitcher = () => {
  const { theme, colorMode, setColorMode } = useTheme();
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const bg = themeColor("surfaceArea");
  const text = themeColor("text");

  const handlePickerToggle = () => {
    setIsPickerVisible((prev) => !prev);
  };

  const handleModeSelect = (mode: ColorModeT) => {
    setColorMode(mode);
    setIsPickerVisible(false);
  };

  return (
    <View style={{ paddingBottom: 50, paddingTop: 10 }}>
      <View style={[styles.categoryBox, { backgroundColor: bg }]}>
        <Ionicons
          name={theme === "dark" ? "moon-outline" : "sunny-outline"}
          size={24}
          color={text}
        />
        <CustomText style={[styles.colorSchemeText, { color: text }]}>
          Color Scheme
        </CustomText>
        <TouchableOpacity
          onPress={handlePickerToggle}
          style={styles.pickerButton}
        >
          <CustomText style={[styles.pickerText, { color: text }]}>
            {colorMode.charAt(0).toUpperCase() + colorMode.slice(1)}
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
          {colorModes.map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => handleModeSelect(mode)}
              style={styles.pickerItem}
            >
              {colorMode === mode ? (
                <Ionicons
                  style={{ marginHorizontal: 5 }}
                  name="checkmark-sharp"
                  size={15}
                  color="#fff"
                />
              ) : (
                <View style={{ marginHorizontal: 5, width: 15 }} />
              )}

              <Text style={styles.pickerItemText}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
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
  colorSchemeText: {
    flex: 1,
    color: "#fff",
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
    bottom: 100,
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

export default ColorSwitcher;

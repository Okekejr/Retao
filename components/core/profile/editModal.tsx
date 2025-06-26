import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface EditModalProps {
  field: string;
  value: string;
  onClose: () => void;
  onSave: (val: string) => void;
}

export const EditModal = ({
  field,
  value,
  onClose,
  onSave,
}: EditModalProps) => {
  const bg = themeColor("background");
  const text = themeColor("text");
  const [input, setInput] = useState(value);

  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: bg }]}>
          <CustomText style={[styles.label, { color: text }]}>
            {t("editListing.edit")} {field}
          </CustomText>
          <TextInput
            value={input}
            onChangeText={setInput}
            style={[styles.input, { color: text, borderColor: text }]}
            placeholder={`Enter ${field}`}
            placeholderTextColor="#aaa"
          />

          <View style={styles.btnRow}>
            <TouchableOpacity onPress={onClose}>
              <CustomText style={[styles.backText, { color: "#999" }]}>
                {t("btnTexts.cancel")}
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onSave(input)}>
              <CustomText style={styles.nextButton}>
                {t("btnTexts.save")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    borderRadius: 14,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Satoshi-Bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  nextButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
    color: "#FFF",
  },
});

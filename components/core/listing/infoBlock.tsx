import CustomText from "@/components/ui/customText";
import { themeColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface InfoBlockProps {
  label: string;
  value: string;
  editFunc?: () => void;
}

export const InfoBlock = ({ label, value, editFunc }: InfoBlockProps) => {
  const textSec = themeColor("textSecondary");
  const text = themeColor("text");

  const Content = (
    <View style={styles.editContainer}>
      <CustomText style={[styles.value, { color: text }]}>
        {value || "—"}
      </CustomText>
      {editFunc && <Ionicons name="create-outline" size={16} color={text} />}
    </View>
  );

  return (
    <View style={styles.infoBlock}>
      <CustomText style={[styles.label, { color: textSec }]}>
        {label}
      </CustomText>

      {editFunc ? (
        <TouchableOpacity onPress={editFunc} activeOpacity={0.7}>
          {Content}
        </TouchableOpacity>
      ) : (
        Content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#000",
    maxWidth: 300,
  },
  editContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

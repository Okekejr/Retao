import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ListAnItemBtnProps {
  openModal: () => void;
}

export const ListAnItemBtn = ({ openModal }: ListAnItemBtnProps) => {
  return (
    <>
      <TouchableOpacity style={styles.ctaButton} onPress={openModal}>
        <Ionicons name="cube-outline" size={28} style={styles.ctaIcon} />
        <View>
          <CustomText style={styles.ctaTitle}>List an item</CustomText>
          <CustomText style={styles.ctaSubtitle}>
            It's fast and easy to get started
          </CustomText>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 4,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ctaIcon: {
    marginRight: 12,
    color: "#fff",
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  ctaSubtitle: {
    fontSize: 13,
    color: "#f0f0f0",
    marginTop: 2,
  },
});

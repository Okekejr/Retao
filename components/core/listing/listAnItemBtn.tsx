import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ListAnItemBtnProps {
  openModal: () => void;
  title?: string;
  subText?: string;
  limitReached?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const ListAnItemBtn = ({
  openModal,
  title = "List an item",
  subText = "Its fast and easy to get started",
  limitReached,
  icon = "cube-outline",
}: ListAnItemBtnProps) => {
  const { userData } = useUserData();

  return (
    <>
      <TouchableOpacity
        style={[
          styles.ctaButton,
          limitReached && { backgroundColor: "#fce4ec" },
        ]}
        onPress={openModal}
      >
        <Ionicons
          name={icon}
          size={28}
          style={[styles.ctaIcon, limitReached && { color: "#d81b60" }]}
        />
        <View>
          <CustomText
            style={[styles.ctaTitle, limitReached && { color: "#000" }]}
          >
            {title} ({userData.stats.listed}/{userData.listing_limit})
          </CustomText>
          <CustomText
            style={[styles.ctaSubtitle, limitReached && { color: "#d81b60" }]}
          >
            {subText}
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

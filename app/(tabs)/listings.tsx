import SelectCategory from "@/components/core/listing/selectCategory";
import { CustomModal } from "@/components/ui/customModal";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ListingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer>
        <Header headerTitle="Listings" style={{ marginBottom: 12 }} />

        <TouchableOpacity style={styles.ctaButton} onPress={openModal}>
          <Ionicons name="cube-outline" size={28} style={styles.ctaIcon} />
          <View>
            <CustomText style={styles.ctaTitle}>List an item</CustomText>
            <CustomText style={styles.ctaSubtitle}>
              It's fast and easy to get started
            </CustomText>
          </View>
        </TouchableOpacity>

        <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
          <SelectCategory closeModal={closeModal} />
        </CustomModal>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  icon: {
    backgroundColor: Colors.light.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
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

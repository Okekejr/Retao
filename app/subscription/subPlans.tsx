import { SelectPlans } from "@/components/core/plans/selectPlans";
import { BackButton } from "@/components/ui/backButton";
import { CustomModal } from "@/components/ui/customModal";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { SettingsItem } from "@/components/ui/settingItem";
import { Colors } from "@/constants/Colors";
import { h2 } from "@/constants/random";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function PlansScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconRow}>
        <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <InnerContainer style={{ flex: 1, gap: 16 }}>
          <View style={styles.modalHeader}>
            <CustomText style={h2}>Manage Subscription</CustomText>
          </View>

          <View style={{ gap: 40 }}>
            <SettingsItem
              header="Subscriptions"
              subHeader="Change your active subscription"
              btnText="Upgrade"
              func={() => openModal("Plans")}
            />
          </View>
        </InnerContainer>
      </ScrollView>

      <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
        {content === "Plans" && <SelectPlans closeModal={closeModal} />}
      </CustomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
    gap: 28,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  modalHeader: {
    marginBottom: 5,
  },
  scrollContent: {
    paddingTop: 20,
  },
});

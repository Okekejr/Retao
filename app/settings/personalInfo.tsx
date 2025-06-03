import { InfoBlock } from "@/components/core/listing/infoBlock";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h2 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function PersonalInfoScreen() {
  const { userData } = useUserData();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconRow}>
        <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      </View>

      <InnerContainer style={{ flex: 1, gap: 32 }}>
        <View style={styles.modalHeader}>
          <CustomText style={h2}>Personal Information</CustomText>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <InfoBlock label="Name" value={userData.name} />
          <InfoBlock label="Handle" value={userData.handle} />
          <InfoBlock label="Email" value={userData.email} />
          <InfoBlock label="Bio" value={userData.bio} />
          <InfoBlock label="Location" value={userData.location} />
        </ScrollView>
      </InnerContainer>
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
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  modalHeader: {
    marginBottom: 20,
  },
});

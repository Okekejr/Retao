import { InfoBlock } from "@/components/core/listing/infoBlock";
import { EditModal } from "@/components/core/profile/editModal";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { h2 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { useUpdatePersonalInfo } from "@/hooks/useUserHistory";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function PersonalInfoScreen() {
  const bg = themeColor("background");
  const text = themeColor("text");
  const { userData } = useUserData();
  const { mutate: updateInfo } = useUpdatePersonalInfo();

  const [editingField, setEditingField] = useState<{
    field: "name" | "email" | "bio";
    value: string;
  } | null>(null);

  const handleEdit = (field: "name" | "email" | "bio", value: string) => {
    setEditingField({ field, value });
  };

  const handleSave = (value: string) => {
    if (editingField) {
      updateInfo({ [editingField.field]: value.trim() });
      setEditingField(null);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.iconRow}>
        <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      </View>

      <InnerContainer style={{ flex: 1, gap: 32 }}>
        <View style={styles.modalHeader}>
          <CustomText style={[h2, { color: text }]}>
            {t("accountSettings.personal")}
          </CustomText>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <InfoBlock
            label={t("userProfile.name")}
            value={userData.name}
            editFunc={() => handleEdit("name", userData.name)}
          />
          <InfoBlock label="Handle" value={userData.handle} />
          <InfoBlock
            label={t("userProfile.email")}
            value={userData.email}
            editFunc={() => handleEdit("email", userData.email)}
          />
          <InfoBlock
            label={t("userProfile.bio")}
            value={userData.bio}
            editFunc={() => handleEdit("bio", userData.bio)}
          />
          <InfoBlock
            label={t("userProfile.location")}
            value={userData.location}
          />
        </ScrollView>
      </InnerContainer>

      {editingField && (
        <EditModal
          field={editingField.field}
          value={editingField.value}
          onClose={() => setEditingField(null)}
          onSave={handleSave}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

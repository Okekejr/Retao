import ColorSwitcher from "@/components/ui/colorSwitcher";
import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import LanguageSwitcher from "@/components/ui/languageSwitcher";
import { h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { t } from "@/localization/t";
import { getAccountSettings, themeColor } from "@/utils";
import { useRouter } from "expo-router";
import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { AppVersion } from "../appVersion";
import { ProfileSection } from "./profileSection";

interface SettingsProps {
  closeModal: () => void;
}

export const Settings: FC<SettingsProps> = ({ closeModal }) => {
  const router = useRouter();
  const { userData } = useUserData();
  const text = themeColor("text");

  const AccountSettings = getAccountSettings();

  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={[h3, { color: text }]}>
          {t("profile.accountSettings")}
        </CustomText>
      </View>

      {userData.isLoggedIn && (
        <FlatList
          data={AccountSettings}
          keyExtractor={(item) => item.label}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <ProfileSection
              icon={item.icon}
              label={item.label}
              onPress={() => {
                item.hrefLink && closeModal(), router.push(item.hrefLink);
              }}
            />
          )}
        />
      )}

      <LanguageSwitcher onClose={closeModal} />

      <ColorSwitcher />

      <CustomDivider style={{ marginVertical: 30 }} />

      <AppVersion style={{ paddingBottom: 50 }} />
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 16,
    alignItems: "center",
  },
});

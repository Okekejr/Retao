import ColorSwitcher from "@/components/ui/colorSwitcher";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { h3 } from "@/constants/random";
import { AccountSettings, themeColor } from "@/utils";
import { useRouter } from "expo-router";
import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ProfileSection } from "./profileSection";

interface SettingsProps {
  closeModal: () => void;
}

export const Settings: FC<SettingsProps> = ({ closeModal }) => {
  const router = useRouter();
  const text = themeColor("text");

  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={[h3, { color: text }]}>Account Settings</CustomText>
      </View>

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

      <ColorSwitcher />
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 16,
    alignItems: "center",
  },
});

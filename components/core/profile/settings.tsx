import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { h3 } from "@/constants/random";
import { AccountSettings } from "@/utils";
import { useRouter } from "expo-router";
import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ProfileSection } from "./profileSection";

export const Settings: FC = () => {
  const router = useRouter();

  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={h3}>Account Settings</CustomText>
      </View>

      <FlatList
        data={AccountSettings}
        keyExtractor={(item) => item.label}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 10, paddingBottom: 50 }}
        renderItem={({ item }) => (
          <ProfileSection
            icon={item.icon}
            label={item.label}
            onPress={() => {
              item.hrefLink && router.push(item.hrefLink);
            }}
          />
        )}
      />
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 16,
    alignItems: "center",
  },
});

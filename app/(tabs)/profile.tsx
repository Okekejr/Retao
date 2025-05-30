import { ListAnItemBtn } from "@/components/core/listing/listAnItemBtn";
import SelectCategory from "@/components/core/listing/selectCategory";
import { IdentityCard } from "@/components/core/profile/identityCard";
import { ProfileSection } from "@/components/core/profile/profileSection";
import { Settings } from "@/components/core/profile/settings";
import { CustomModal } from "@/components/ui/customModal";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { mockUserProfile } from "@/constants/random";
import { profileItems } from "@/utils";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ gap: 12 }}>
        <Header headerTitle="Profile" style={{ marginBottom: 12 }} />

        <ScrollView>
          <IdentityCard user={mockUserProfile} />

          <ListAnItemBtn openModal={() => openModal("createListing")} />

          <FlatList
            data={profileItems}
            keyExtractor={(item) => item.label}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
              <ProfileSection
                icon={item.icon}
                label={item.label}
                onPress={() => {
                  item.hrefLink && router.push(item.hrefLink);
                  item.content && openModal(item.content);
                }}
              />
            )}
          />

          <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
            {content === "createListing" && (
              <SelectCategory closeModal={closeModal} />
            )}

            {content === "settings" && <Settings />}
          </CustomModal>
        </ScrollView>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});

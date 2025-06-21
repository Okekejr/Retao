import { ListAnItemBtn } from "@/components/core/listing/listAnItemBtn";
import SelectCategory from "@/components/core/listing/selectCategory";
import { SelectPlans } from "@/components/core/plans/selectPlans";
import { IdentityCard } from "@/components/core/profile/identityCard";
import { ProfileSection } from "@/components/core/profile/profileSection";
import { Settings } from "@/components/core/profile/settings";
import { CustomModal } from "@/components/ui/customModal";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useGetUserData } from "@/hooks/useGetUserData";
import { useLogout } from "@/hooks/useLogout";
import { profileItems, themeColor } from "@/utils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { userData } = useUserData();
  const { refreshData } = useGetUserData();
  const { logout } = useLogout();
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const bg = themeColor("background");

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = () => setModalVisible(false);

  const handleViewOwnerProfile = () => {
    if (!userData.id) return;
    router.push({
      pathname: "/userProfile/userProfileCard",
      params: { userId: userData.id },
    });
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (userData.id === "") {
        try {
          setLoading(true);
          await refreshData();
        } catch (error) {
          console.log("Error refreshing userData:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserData();
  }, [userData.id]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {loading && (
        <View style={[styles.loaderOverlay, { backgroundColor: bg }]}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      )}

      <InnerContainer style={{ gap: 12, marginTop: 20 }}>
        <Header headerTitle="Profile" style={{ marginBottom: 12 }} />

        <ScrollView style={{ gap: 12 }}>
          {userData.id !== "" && (
            <TouchableOpacity onPress={handleViewOwnerProfile}>
              <IdentityCard
                user={userData}
                func={() => openModal("Plans")}
                showPlan
              />
            </TouchableOpacity>
          )}

          {userData.subscription_plan === "unlimited" ||
          userData.stats.listed < userData.listing_limit ? (
            <ListAnItemBtn openModal={() => openModal("createListing")} />
          ) : (
            <ListAnItemBtn
              openModal={() => openModal("Plans")}
              title="Listing limit reached"
              subText="Upgrade your plan"
              icon="checkmark-done-circle-outline"
              limitReached
            />
          )}

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
                  item.func && logout();
                }}
              />
            )}
          />

          <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
            {content === "createListing" && (
              <SelectCategory closeModal={closeModal} />
            )}

            {content === "settings" && <Settings closeModal={closeModal} />}

            {content === "Plans" && <SelectPlans closeModal={closeModal} />}
          </CustomModal>
        </ScrollView>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  upgradeButton: {
    backgroundColor: "#fce4ec",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 14,
  },
  upgradeText: {
    color: "#d81b60",
    fontWeight: "bold",
  },
});

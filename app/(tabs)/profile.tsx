import AuthGuard from "@/components/core/authGuard";
import { ListAnItemBtn } from "@/components/core/listing/listAnItemBtn";
import SelectCategory from "@/components/core/listing/selectCategory";
import { RequireLoginProfile } from "@/components/core/notLogged/requireLogin";
import { SelectPlans } from "@/components/core/plans/selectPlans";
import { IdentityCard } from "@/components/core/profile/identityCard";
import { ProfileSection } from "@/components/core/profile/profileSection";
import { Settings } from "@/components/core/profile/settings";
import { CustomModal } from "@/components/ui/customModal";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import SkeletonProfileLoader from "@/components/ui/skeletonLoaders/skeletonProfileLoader";
import { useUserData } from "@/context/userContext";
import { useGetUserData } from "@/hooks/useGetUserData";
import { useLogout } from "@/hooks/useLogout";
import { t } from "@/localization/t";
import {
  getLoggedOutProfileItems,
  getProfileItems,
  showToast,
  themeColor,
} from "@/utils";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const { height } = Dimensions.get("window");

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

  const closeModal = useCallback(() => setModalVisible(false), []);

  const handleViewOwnerProfile = () => {
    if (!userData.id) return;
    router.push({
      pathname: "/userProfile/userProfileCard",
      params: { userId: userData.id },
    });
  };

  const handleOpenLink = async (href: string) => {
    const supported = await Linking.canOpenURL(href);
    if (supported) {
      await Linking.openURL(href);
    } else {
      showToast({
        type: "error",
        text1: t("profile.toasts.invalidLink.title"),
        message: t("profile.toasts.invalidLink.message"),
      });
    }
  };

  const handleOpenEmail = async () => {
    const email = "dylanokeks8965@gmail.com";
    const subject = encodeURIComponent("Hello Dylan");
    const body = encodeURIComponent("I need some help!");
    const url = `mailto:${email}?subject=${subject}&body=${body}`;

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      showToast({
        type: "error",
        text1: t("profile.toasts.emailError.title"),
        message: t("profile.toasts.emailError.message"),
      });
    }
  };

  useEffect(() => {
    if (userData.id !== "") {
      try {
        setLoading(true);
        refreshData();
      } catch (error) {
        console.log("Error refreshing userData", error);
        showToast({
          type: "error",
          text1: t("profile.toasts.refreshError.title"),
          message: t("profile.toasts.refreshError.message"),
        });
      } finally {
        setLoading(false);
      }
    }
  }, [userData.id]);

  const profileItems = userData.id
    ? getProfileItems()
    : getLoggedOutProfileItems();

  return (
    <>
      <AuthGuard>
        <RequireLoginProfile
          title={t("profile.notLoggedIn.title")}
          subTitle={t("profile.notLoggedIn.subTitle")}
          btnText={t("profile.notLoggedIn.btnText")}
          bgColor={bg}
          headerTitle={t("profile.title")}
          height={height}
          modalVisible={modalVisible}
          content={content}
          openModal={openModal}
          closeModal={closeModal}
          notLoggedInProfileList={
            <FlatList
              data={profileItems}
              keyExtractor={(item) => item.label}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10 }}
              showsVerticalScrollIndicator={false}
              style={{ paddingBottom: 270 }}
              renderItem={({ item }) => (
                <ProfileSection
                  icon={item.icon}
                  label={item.label}
                  onPress={() => {
                    if (item.func) logout();
                    else if (item.content) openModal(item.content);
                    else if (item.hrefLink) router.push(item.hrefLink);
                    else if (item.mail) handleOpenEmail();
                    else if (item.href) handleOpenLink(item.href);
                  }}
                />
              )}
            />
          }
        >
          {!loading && (
            <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
              <InnerContainer style={{ gap: 12, marginTop: 20 }}>
                <Header
                  headerTitle={t("profile.title")}
                  style={{ marginBottom: 12 }}
                />

                {loading ? (
                  <ScrollView style={{ gap: 12, paddingBottom: height }}>
                    <SkeletonProfileLoader />
                  </ScrollView>
                ) : (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ gap: 12, paddingBottom: height }}
                  >
                    {userData.id !== "" && (
                      <TouchableOpacity onPress={handleViewOwnerProfile}>
                        <IdentityCard
                          user={userData}
                          func={() => openModal("plans")}
                          showPlan
                        />
                      </TouchableOpacity>
                    )}

                    {userData.subscription_plan === "unlimited" ||
                    userData.stats.listed < userData.listing_limit ? (
                      <ListAnItemBtn
                        openModal={() => openModal("createListing")}
                      />
                    ) : (
                      <ListAnItemBtn
                        openModal={() => openModal("plans")}
                        title={t("listings.listLimitTitle")}
                        subText={t("listings.listLimitSubTitle")}
                        icon="checkmark-done-circle-outline"
                        limitReached
                      />
                    )}

                    <FlatList
                      data={profileItems}
                      keyExtractor={(item) => item.label}
                      scrollEnabled={false}
                      contentContainerStyle={{ gap: 10 }}
                      showsVerticalScrollIndicator={false}
                      style={{ paddingBottom: 270 }}
                      renderItem={({ item }) => (
                        <ProfileSection
                          icon={item.icon}
                          label={item.label}
                          onPress={() => {
                            if (item.func) logout();
                            else if (item.content) openModal(item.content);
                            else if (item.hrefLink) router.push(item.hrefLink);
                            else if (item.mail) handleOpenEmail();
                            else if (item.href) handleOpenLink(item.href);
                          }}
                        />
                      )}
                    />

                    <CustomModal
                      modalVisible={modalVisible}
                      closeModal={closeModal}
                    >
                      {content === "createListing" && (
                        <SelectCategory closeModal={closeModal} />
                      )}

                      {content === "settings" && (
                        <Settings closeModal={closeModal} />
                      )}

                      {content === "plans" && (
                        <SelectPlans closeModal={closeModal} />
                      )}
                    </CustomModal>
                  </ScrollView>
                )}
              </InnerContainer>
            </SafeAreaView>
          )}
        </RequireLoginProfile>
      </AuthGuard>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

import { ItemsCard } from "@/components/core/items/itemsCard";
import { NotLogged } from "@/components/core/notLogged";
import { GetLoggedInModal } from "@/components/core/notLogged/getLoggedIn";
import { GetSiggnedUp } from "@/components/core/notLogged/getSignedUp";
import { CustomModal } from "@/components/ui/customModal";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import SkeletonWishlistLoader from "@/components/ui/skeletonLoaders/skeletonWishlistLoader";
import { useUserData } from "@/context/userContext";
import { useFavorites } from "@/hooks/useFavorite";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import { useFocusEffect } from "expo-router";
import { MotiView } from "moti";
import { useCallback, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function WishlistScreen() {
  const bg = themeColor("background");
  const textSec = themeColor("textSecondary");
  const { userData } = useUserData();
  const {
    data: favorited = [],
    isLoading,
    refetch,
  } = useFavorites(userData.id);

  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");

  const firstFocusRun = useRef(true);

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = useCallback(() => setModalVisible(false), []);

  const refreshFavorites = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Failed to refresh favorites", error);
    }
  }, [refetch]);

  useFocusEffect(
    useCallback(() => {
      if (firstFocusRun.current) {
        firstFocusRun.current = false;
        return;
      }
      if (userData.isLoggedIn === true) {
        refreshFavorites();
      }
    }, [userData.isLoggedIn, refreshFavorites])
  );

  if (!userData.isLoggedIn) {
    return (
      <>
        <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
          <InnerContainer style={{ gap: 12, marginTop: 20 }}>
            <Header
              headerTitle={t("wishList.title")}
              style={{ marginBottom: 12 }}
            />
            <NotLogged
              title={t("wishList.notLoggedIn.title")}
              subTitle={t("wishList.notLoggedIn.subTitle")}
              func={() => openModal("Login")}
            />
          </InnerContainer>
        </SafeAreaView>

        <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
          {content === "Login" && (
            <GetLoggedInModal closeModal={closeModal} func={openModal} />
          )}
          {content === "Signup" && (
            <GetSiggnedUp closeModal={closeModal} func={openModal} />
          )}
        </CustomModal>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
          <InnerContainer style={{ gap: 12, marginTop: 20 }}>
            <Header
              headerTitle={t("wishList.title")}
              style={{ marginBottom: 12 }}
            />
            <SkeletonWishlistLoader />
          </InnerContainer>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
        <InnerContainer style={{ gap: 12, marginTop: 20 }}>
          <Header
            headerTitle={t("wishList.title")}
            style={{ marginBottom: 12 }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              {favorited.length > 0 ? (
                favorited.map((item, index) => (
                  <MotiView
                    key={item.id}
                    from={{ opacity: 0, translateY: 10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      delay: 400 + index * 80,
                      type: "timing",
                      duration: 400,
                    }}
                  >
                    <ItemsCard {...item} />
                  </MotiView>
                ))
              ) : (
                <CustomText style={[styles.emptyText, { color: textSec }]}>
                  {t("wishList.noFavs")}
                </CustomText>
              )}
            </View>
          </ScrollView>
        </InnerContainer>
      </SafeAreaView>

      <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
        {content === "Login" && (
          <GetLoggedInModal closeModal={closeModal} func={openModal} />
        )}
        {content === "Signup" && (
          <GetSiggnedUp closeModal={closeModal} func={openModal} />
        )}
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    width: "100%",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

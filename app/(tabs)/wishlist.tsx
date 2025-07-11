import AuthGuard from "@/components/core/authGuard";
import { ItemsCard } from "@/components/core/items/itemsCard";
import { RequireLogin } from "@/components/core/notLogged/requireLogin";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import SkeletonWishlistLoader from "@/components/ui/skeletonLoaders/skeletonWishlistLoader";
import { useUserData } from "@/context/userContext";
import { useFavorites } from "@/hooks/useFavorite";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import { MotiView } from "moti";
import { useCallback, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function WishlistScreen() {
  const { userData, isUserReady } = useUserData();
  const bg = themeColor("background");
  const textSec = themeColor("textSecondary");

  const {
    data: favorited = [],
    isLoading,
    refetch,
  } = useFavorites(userData.id);

  const refreshFavorites = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Failed to refresh favorites", error);
    }
  }, [refetch]);

  useEffect(() => {
    if (userData.id !== "") {
      refreshFavorites();
    }
  }, [userData.id]);

  if (!isUserReady) return;

  return (
    <AuthGuard>
      <RequireLogin
        title={t("wishList.notLoggedIn.title")}
        subTitle={t("wishList.notLoggedIn.subTitle")}
        bgColor={bg}
        headerTitle={t("wishList.title")}
      >
        {!isLoading && (
          <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
            <InnerContainer style={{ gap: 12, marginTop: 20 }}>
              <Header
                headerTitle={t("wishList.title")}
                style={{ marginBottom: 12 }}
              />

              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "timing",
                  duration: 400,
                }}
              >
                {isLoading ? (
                  <SkeletonWishlistLoader />
                ) : (
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
                        <CustomText
                          style={[styles.emptyText, { color: textSec }]}
                        >
                          {t("wishList.noFavs")}
                        </CustomText>
                      )}
                    </View>
                  </ScrollView>
                )}
              </MotiView>
            </InnerContainer>
          </SafeAreaView>
        )}
      </RequireLogin>
    </AuthGuard>
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
});

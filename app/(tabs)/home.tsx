import { CategoriesSection } from "@/components/core/categories/categoriesSection";
import { ItemSection } from "@/components/core/items/itemSection";
import { GetLoggedInModal } from "@/components/core/notLogged/getLoggedIn";
import { GetSiggnedUp } from "@/components/core/notLogged/getSignedUp";
import { SearchBar } from "@/components/core/searchBar";
import { SearchModal } from "@/components/core/searchModal";
import { CustomModal } from "@/components/ui/customModal";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetFeaturedListings, useGetListings } from "@/hooks/useGetListings";
import { useGetLocation } from "@/hooks/useGetLocation";
import { themeColor } from "@/utils";
import { AnimatePresence, MotiView } from "moti";
import { useCallback, useEffect, useState } from "react";
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { t } from "../../localization/t";

export default function HomeScreen() {
  const { userData } = useUserData();
  const { data: location } = useGetLocation();
  const {
    data: Listings,
    isLoading,
    refetch: refetchListings,
  } = useGetListings(true, userData.location ? userData.location : undefined);
  const {
    data: featuredListings,
    isLoading: featuredLoading,
    refetch: refetchFeatured,
  } = useGetFeaturedListings();
  const {
    data: ListingByLoc,
    isLoading: loadingLoc,
    refetch: refetchByLoc,
  } = useGetListings(true, location ? location : userData.location);
  const { data: Categories, isLoading: catLoading } = useGetCategories();

  const bg = themeColor("background");
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const isAnyLoading = isLoading || loadingLoc || catLoading || featuredLoading;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchListings(), refetchFeatured(), refetchByLoc()]);
    } catch (e) {
      console.error("Refresh failed", e);
    } finally {
      setRefreshing(false);
    }
  }, [refetchListings, refetchFeatured, refetchByLoc]);

  useEffect(() => {
    if (userData.id === "") {
      setContent("Login");
      setModal(true);
    }
  }, [userData.id]);

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = () => setModal(false);

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
        {isAnyLoading && <></>}
        <InnerContainer style={{ gap: 12, marginTop: 20 }}>
          <Header headerTitle={t("home.title")} />

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <SearchBar placeholder={t("home.searchBar")} />
          </TouchableOpacity>

          <SearchModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.light.primary]}
                tintColor={Colors.light.primary}
              />
            }
          >
            {Listings && Listings.length > 0 && (
              <ItemSection heading={t("home.recently")} data={Listings} />
            )}

            {featuredListings && featuredListings?.length > 0 && (
              <ItemSection
                heading={t("home.featured")}
                data={featuredListings}
                feat
              />
            )}

            {ListingByLoc && ListingByLoc.length > 0 && location && (
              <ItemSection
                heading={t("home.location", { location: location })}
                data={ListingByLoc}
                loc={location}
              />
            )}

            {Categories && (
              <CategoriesSection
                title={t("home.categories")}
                data={Categories}
              />
            )}
          </ScrollView>
        </InnerContainer>
      </SafeAreaView>

      <CustomModal modalVisible={modal} closeModal={closeModal}>
        <AnimatePresence exitBeforeEnter>
          {content === "Login" && (
            <MotiView
              key="login"
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ type: "timing", duration: 300 }}
            >
              <GetLoggedInModal closeModal={closeModal} func={openModal} />
            </MotiView>
          )}

          {content === "Signup" && (
            <MotiView
              key="signup"
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ type: "timing", duration: 300 }}
            >
              <GetSiggnedUp closeModal={closeModal} func={openModal} />
            </MotiView>
          )}
        </AnimatePresence>
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 30 : 30,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

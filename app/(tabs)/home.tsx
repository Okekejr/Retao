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
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { t } from "../../localization/t";

export default function HomeScreen() {
  const { userData } = useUserData();
  const {
    data: Listings,
    isLoading,
    refetch: refetchListings,
  } = useGetListings();
  const { data: location } = useGetLocation();
  const {
    data: featuredListings,
    isLoading: featuredLoading,
    refetch: refetchFeatured,
  } = useGetFeaturedListings();
  const {
    data: ListingByLoc,
    isLoading: loadingLoc,
    refetch: refetchByLoc,
  } = useGetListings(location, undefined, undefined);
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
    if (!userData.isLoggedIn) {
      setContent("Login");
      setModal(true);
    }
  }, [userData.isLoggedIn]);

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = () => setModal(false);

  return (
    <>
      <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
        {isAnyLoading && (
          <View
            style={[
              { flex: 1, justifyContent: "center", alignItems: "center" },
              { backgroundColor: bg },
            ]}
          >
            <Animatable.View animation="bounceIn">
              <LottieView
                source={require("../../assets/loading.json")}
                autoPlay
                loop={false}
                style={styles.lottie}
              />
            </Animatable.View>
          </View>
        )}
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
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 30 : 30,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

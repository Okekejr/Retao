import { CategoriesSection } from "@/components/core/categories/categoriesSection";
import { ItemSection } from "@/components/core/items/itemSection";
import { SearchBar } from "@/components/core/searchBar";
import { SearchModal } from "@/components/core/searchModal";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetFeaturedListings, useGetListings } from "@/hooks/useGetListings";
import { useGetLocation } from "@/hooks/useGetLocation";
import { themeColor } from "@/utils";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { t } from "../../localization/t";

export default function HomeScreen() {
  const bg = themeColor("background");
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
  } = useGetFeaturedListings(location);
  const {
    data: ListingByLoc,
    isLoading: loadingLoc,
    refetch: refetchByLoc,
  } = useGetListings(location, undefined, undefined);
  const { data: Categories, isLoading: catLoading } = useGetCategories();

  const [modalVisible, setModalVisible] = useState(false);
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {isAnyLoading && (
        <View style={[styles.loaderOverlay, { backgroundColor: bg }]}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
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
            <CategoriesSection title={t("home.categories")} data={Categories} />
          )}
        </ScrollView>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 30 : 30,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

import { CategoriesSection } from "@/components/core/categories/categoriesSection";
import { ItemSection } from "@/components/core/items/itemSection";
import { SearchBar } from "@/components/core/searchBar";
import { SearchModal } from "@/components/core/searchModal";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetListings } from "@/hooks/useGetListings";
import { useGetLocation } from "@/hooks/useGetLocation";
import { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen() {
  const { data: Listings } = useGetListings();
  const { data: location } = useGetLocation();
  const { data: ListingByLoc } = useGetListings();
  const { data: Categories } = useGetCategories();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ gap: 12, marginTop: 20 }}>
        <Header headerTitle="Home" />

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <SearchBar placeholder="Search items, tools, equipment…" />
        </TouchableOpacity>

        <SearchModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {Listings && (
            <ItemSection heading="Recently Listed Near You" data={Listings} />
          )}

          {ListingByLoc && (
            <ItemSection
              heading={`Listed in ${location ?? "your area"}`}
              data={ListingByLoc}
              loc={location}
            />
          )}

          {Categories && (
            <CategoriesSection title="Categories" data={Categories} />
          )}
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
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 30 : 30,
  },
});

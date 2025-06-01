import { CategoriesSection } from "@/components/core/categories/categoriesSection";
import { ItemSection } from "@/components/core/items/itemSection";
import { SearchBar } from "@/components/core/searchBar";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { mockItems } from "@/constants/random";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetLocation } from "@/hooks/useGetLocation";
import { Platform, SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { data: location } = useGetLocation();
  const { data: Categories } = useGetCategories();

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ gap: 12 }}>
        <Header headerTitle="Home" />
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search items, tools, equipment…"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ItemSection heading="Popular Near You" data={mockItems} />

          <ItemSection
            heading={`Available in ${location ?? "your area"}`}
            data={mockItems}
          />

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
    paddingBottom: Platform.OS === "ios" ? 90 : 30,
  },
});

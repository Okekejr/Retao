import { ItemsCard } from "@/components/core/items/itemsCard";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { categoriesIcon, h3 } from "@/constants/random";
import {
  useGetCategoryById,
  useGetListingsByCategory,
} from "@/hooks/useGetCategories";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { height } = Dimensions.get("window");

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const { data: category } = useGetCategoryById(id as string);
  const { data: listings, isLoading } = useGetListingsByCategory(id as string);

  if (isLoading || !listings || !category) return;

  const iconObj = categoriesIcon.find((i) => i.id === category.icon);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={iconObj?.icon} style={styles.image} contentFit="cover" />

        <View style={styles.iconRow}>
          <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
        </View>
      </View>

      <InnerContainer style={{ flex: 1 }}>
        <CustomText style={[h3, styles.title]}>{category?.title}</CustomText>
        <CustomText style={styles.description}>
          {category?.description ||
            "Explore and borrow items shared by your neighbors."}
        </CustomText>

        <ScrollView
          showsVerticalScrollIndicator
          contentContainerStyle={{ paddingBottom: 60 }}
          style={{ flex: 1 }}
        >
          <View style={styles.grid}>
            {listings.length > 0 ? (
              listings.map((item, index) => (
                <MotiView
                  key={item.id}
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    delay: 500 + index * 80,
                    type: "timing",
                    duration: 500,
                  }}
                >
                  <ItemsCard {...item} />
                </MotiView>
              ))
            ) : (
              <CustomText style={styles.emptyText}>
                No items available in this category yet.
              </CustomText>
            )}
          </View>
        </ScrollView>
      </InnerContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    backgroundColor: Colors.light.background,
  },
  imageContainer: {
    width: "100%",
    height: height / 2.8,
    position: "relative",
  },
  iconRow: {
    position: "absolute",
    left: 20,
    top: 60,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: Colors.light.text,
    marginTop: 12,
    marginBottom: 5,
  },
  description: {
    color: Colors.light.text,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 20,
  },
  emptyText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    width: "100%",
  },
});

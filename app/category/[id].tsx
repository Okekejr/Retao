import { ItemsCard } from "@/components/core/items/itemsCard";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { categories, h3, mockItems } from "@/constants/random";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { height } = Dimensions.get("window");

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();

  const category = categories.find((cat) => cat.id === id);
  const filteredItems = mockItems.filter(
    (item) => item.category === category?.title
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={category?.icon}
          style={styles.image}
          contentFit="cover"
        />

        <View style={styles.iconRow}>
          <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
        </View>
      </View>

      <InnerContainer>
        <CustomText style={[h3, styles.title]}>{category?.title}</CustomText>
        <CustomText style={styles.description}>
          {category?.description ||
            "Explore and borrow items shared by your neighbors."}
        </CustomText>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
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
    marginBottom: 6,
  },
  description: {
    color: Colors.light.text,
    marginTop: 5,
    gap: 12,
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
  },
  emptyText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    width: "100%",
  },
});

import { ItemsCard } from "@/components/core/items/itemsCard";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { categoriesIcon, h3 } from "@/constants/random";
import {
  useGetCategoryById,
  useGetListingsByCategory,
} from "@/hooks/useGetCategories";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { MotiView } from "moti";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

const { height } = Dimensions.get("window");

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const bg = themeColor("background");
  const text = themeColor("text");
  const textSec = themeColor("textSecondary");
  const { data: category } = useGetCategoryById(id as string);
  const { data: listings, isLoading } = useGetListingsByCategory(id as string);

  const iconObj = categoriesIcon.find((i) => i.id === category?.icon);

  return (
    <>
      {isLoading || !listings || !category ? (
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
      ) : (
        <View style={[styles.container, { backgroundColor: bg }]}>
          <View style={styles.imageContainer}>
            <Image
              source={iconObj?.icon}
              style={styles.image}
              contentFit="cover"
            />

            <View style={styles.iconRow}>
              <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
            </View>
          </View>

          <InnerContainer style={{ flex: 1 }}>
            <CustomText style={[h3, styles.title, { color: text }]}>
              {category?.title}
            </CustomText>
            <CustomText style={[styles.description, { color: text }]}>
              {category?.description}
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
                  <CustomText style={[styles.emptyText, { color: textSec }]}>
                    {t("categories.noItems")}
                  </CustomText>
                )}
              </View>
            </ScrollView>
          </InnerContainer>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  lottie: {
    width: 200,
    height: 200,
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
    marginTop: 12,
    marginBottom: 5,
  },
  description: {
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
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    width: "100%",
  },
});

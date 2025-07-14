import { CategoryFilterSheet } from "@/components/core/categories/categoryFilterSheet";
import { ItemsCard } from "@/components/core/items/itemsCard";
import { BackButton } from "@/components/ui/backButton";
import { CustomModal } from "@/components/ui/customModal";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { categoriesIcon, h3 } from "@/constants/random";
import {
  useGetCategoryById,
  useGetListingsByCategory,
} from "@/hooks/useGetCategories";
import { t } from "@/localization/t";
import { Filters } from "@/types";
import { themeColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { AnimatePresence, MotiView } from "moti";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
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

  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = useCallback(() => setModalVisible(false), []);

  const [filters, setFilters] = useState<Filters>({
    location: "",
    subscriptionPlans: [],
  });
  const [filteredListings, setFilteredListings] = useState<
    | {
        id: string;
        title: string;
        description: string;
        distance: string;
        image: string[];
        favorited?: boolean;
        subscription_plan: string;
      }[]
    | undefined
  >();
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    if (listings) {
      setFilteredListings(listings);
    }
  }, [listings]);

  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters);

    const countActiveFilters =
      ((newFilters.location ?? "").trim() ? 1 : 0) +
      newFilters.subscriptionPlans.length;

    setActiveFilterCount(countActiveFilters);

    const filtered = listings?.filter((item) => {
      const matchesLocation = newFilters.location
        ? item.distance
            .toLowerCase()
            .includes(newFilters.location.toLowerCase())
        : true;
      const matchesSub = newFilters.subscriptionPlans.length
        ? newFilters.subscriptionPlans.includes(item.subscription_plan)
        : true;

      return matchesLocation && matchesSub;
    });

    setFilteredListings(filtered || []);

    closeModal();
  };

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

          <InnerContainer style={{ flex: 1, gap: 12 }}>
            <View>
              <CustomText style={[h3, styles.title, { color: text }]}>
                {category?.title}
              </CustomText>
              <CustomText style={[styles.description, { color: text }]}>
                {category?.description}
              </CustomText>
            </View>

            {/* Number of items and Filter Button */}
            <View style={styles.headerRow}>
              <CustomText style={[styles.itemNumText, { color: text }]}>
                {filteredListings && filteredListings.length}{" "}
                {t("listings.title")}
              </CustomText>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: text }]}
                onPress={() => {
                  Haptics.selectionAsync();
                  openModal("Filters");
                }}
              >
                <CustomText style={[styles.filterButtonText, { color: bg }]}>
                  Filters{" "}
                  {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
                </CustomText>
                <Ionicons name="filter-outline" size={18} color={bg} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator
              contentContainerStyle={{ paddingBottom: 60 }}
              style={{ flex: 1 }}
            >
              <View style={styles.grid}>
                {filteredListings && filteredListings.length > 0 ? (
                  filteredListings.map((item, index) => (
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

            <CustomModal
              modalVisible={modalVisible}
              closeModal={closeModal}
              bg="#FFF"
              style={{
                borderRadius: 24,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 6,
              }}
            >
              <AnimatePresence exitBeforeEnter>
                {content === "Filters" && (
                  <MotiView
                    key="filters"
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -20 }}
                    transition={{ type: "timing", duration: 300 }}
                  >
                    <CategoryFilterSheet
                      onClose={closeModal}
                      onApplyFilters={applyFilters}
                      activeFilters={filters}
                    />
                  </MotiView>
                )}
              </AnimatePresence>
            </CustomModal>
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
    fontSize: 15,
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemNumText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterButtonText: {
    marginRight: 5,
    fontSize: 13,
  },
});

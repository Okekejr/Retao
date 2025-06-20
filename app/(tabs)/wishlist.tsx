import { ItemsCard } from "@/components/core/items/itemsCard";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useFavorites } from "@/hooks/useFavorite";
import { themeColor } from "@/utils";
import { MotiView } from "moti";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function WishlistScreen() {
  const bg = themeColor("background");
  const textSec = themeColor("textSecondary");
  const { userData } = useUserData();
  const { data: favorited = [], isLoading } = useFavorites(userData.id);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {isLoading && (
        <View style={[styles.loaderOverlay, { backgroundColor: bg }]}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      )}
      <InnerContainer style={{ gap: 12, marginTop: 20 }}>
        <Header headerTitle="Wishlist" />

        {isLoading ? (
          <CustomText style={[styles.emptyText, { color: textSec }]}>
            Loading favorites...
          </CustomText>
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
                <CustomText style={[styles.emptyText, { color: textSec }]}>
                  No favorited items available yet.
                </CustomText>
              )}
            </View>
          </ScrollView>
        )}
      </InnerContainer>
    </SafeAreaView>
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
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

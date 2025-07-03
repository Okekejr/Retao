import { Colors } from "@/constants/Colors";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const itemWidth = (width - 16 * 3) / 2;

const SkeletonWishlistItem = () => (
  <MotiView
    from={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
    }}
    style={styles.cardItem}
  >
    <View style={styles.imagePlaceholder} />
    <View style={styles.textLinePlaceholder} />
    <View style={styles.shortTextLinePlaceholder} />
  </MotiView>
);

const SkeletonWishlistLoader: React.FC = () => {
  return (
    <View style={styles.grid}>
      {Array.from({ length: 6 }).map(
        (
          _,
          index // Render enough items to fill the screen
        ) => (
          <SkeletonWishlistItem key={index} />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingBottom: 20,
  },
  cardItem: {
    width: 180,
    height: 180,
    backgroundColor: Colors.light.muted,
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  imagePlaceholder: {
    width: "100%",
    height: 120, // Image height within card
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 8,
    opacity: 0.2,
  },
  textLinePlaceholder: {
    height: 14,
    width: "90%",
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 4,
    opacity: 0.2,
    marginTop: 8,
  },
  shortTextLinePlaceholder: {
    height: 12,
    width: "60%",
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 4,
    opacity: 0.2,
    marginTop: 4,
  },
});

export default SkeletonWishlistLoader;

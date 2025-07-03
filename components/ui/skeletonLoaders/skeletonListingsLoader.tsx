import { Colors } from "@/constants/Colors";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

const SkeletonSectionHeader = () => (
  <MotiView
    from={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
    }}
    style={styles.headerPlaceholder}
  />
);

const SkeletonCardItem = () => (
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

const SkeletonListingsLoader: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Mimic "My Listings" section */}
      <SkeletonSectionHeader />
      <View style={styles.horizontalList}>
        {Array.from({ length: 2 }).map(
          (
            _,
            index // Show 2-3 cards horizontally
          ) => (
            <SkeletonCardItem key={`my-listings-${index}`} />
          )
        )}
      </View>

      {/* Mimic "Borrowed Listings" section (optional, if always present) */}
      <SkeletonSectionHeader />
      <View style={styles.horizontalList}>
        {Array.from({ length: 2 }).map((_, index) => (
          <SkeletonCardItem key={`borrowed-listings-${index}`} />
        ))}
      </View>

      {/* Mimic "Requests" section */}
      <SkeletonSectionHeader />
      <View style={styles.horizontalList}>
        {Array.from({ length: 2 }).map((_, index) => (
          <SkeletonCardItem key={`requests-${index}`} />
        ))}
      </View>
      {/* Mimic "My Pending" section */}
      <SkeletonSectionHeader />
      <View style={styles.horizontalList}>
        {Array.from({ length: 2 }).map((_, index) => (
          <SkeletonCardItem key={`pending-${index}`} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    gap: 20, // Spacing between sections
  },
  headerPlaceholder: {
    height: 24, // Height of your h3 heading
    width: "50%",
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 4,
    opacity: 0.2,
    marginBottom: 10,
    marginLeft: 16, // Adjust to match your InnerContainer padding
  },
  horizontalList: {
    flexDirection: "row",
    gap: 12, // Spacing between cards in horizontal FlatList
    paddingLeft: 16, // Match contentContainerStyle of FlatList
  },
  cardItem: {
    width: width * 0.4, // Approx width of your ItemsCard/RequestCard
    height: 180, // Approx height
    backgroundColor: Colors.light.muted,
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  imagePlaceholder: {
    width: "100%",
    height: 100, // Image height
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

export default SkeletonListingsLoader;

import { Colors } from "@/constants/Colors";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, View } from "react-native";

const SkeletonItem = () => (
  <MotiView
    from={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
    }}
    style={styles.skeletonItem}
  >
    <View style={styles.avatarPlaceholder} />
    <View style={styles.textContainer}>
      <View style={styles.linePlaceholder} />
      <View style={styles.shortLinePlaceholder} />
    </View>
    <View style={styles.timePlaceholder} />
  </MotiView>
);

const SkeletonConversationsLoader: React.FC = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 7 }).map(
        (
          _,
          index // Adjust length based on how many cards fit your screen
        ) => (
          <SkeletonItem key={index} />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 12, // Or your desired spacing between cards
  },
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.muted,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.textSecondary,
    marginRight: 12,
    opacity: 0.2,
  },
  textContainer: {
    flex: 1,
    gap: 6,
  },
  linePlaceholder: {
    height: 14,
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 4,
    width: "70%",
    opacity: 0.2,
  },
  shortLinePlaceholder: {
    height: 12,
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 4,
    width: "40%",
    opacity: 0.2,
  },
  timePlaceholder: {
    width: 40,
    height: 12,
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 4,
    opacity: 0.2,
    marginLeft: 10,
  },
});

export default SkeletonConversationsLoader;

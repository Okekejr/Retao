import { Colors } from "@/constants/Colors";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, View } from "react-native";

const SkeletonIdentityCard = () => (
  <MotiView
    from={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
    }}
    style={styles.identityCard}
  >
    <View style={styles.avatarPlaceholder} />
    <View style={styles.infoContainer}>
      <View style={styles.namePlaceholder} />
      <View style={styles.emailPlaceholder} />
    </View>
    <View style={styles.planPlaceholder} />
  </MotiView>
);

const SkeletonButton = () => (
  <MotiView
    from={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
    }}
    style={styles.buttonPlaceholder}
  />
);

const SkeletonProfileSection = () => (
  <MotiView
    from={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1000,
      loop: true,
    }}
    style={styles.sectionItem}
  >
    <View style={styles.iconPlaceholder} />
    <View style={styles.labelPlaceholder} />
  </MotiView>
);

const SkeletonProfileLoader: React.FC = () => {
  return (
    <View style={styles.container}>
      <SkeletonIdentityCard />
      <SkeletonButton />
      {Array.from({ length: 5 }).map(
        (
          _,
          index // Adjust count based on your typical sections
        ) => (
          <SkeletonProfileSection key={`section-${index}`} />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 20,
  },
  identityCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.light.muted,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.textSecondary,
    opacity: 0.2,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    gap: 8,
  },
  namePlaceholder: {
    height: 18,
    width: "70%",
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 4,
    opacity: 0.2,
  },
  emailPlaceholder: {
    height: 14,
    width: "50%",
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 4,
    opacity: 0.2,
  },
  planPlaceholder: {
    width: 80,
    height: 25,
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 5,
    opacity: 0.2,
    marginLeft: 10,
  },
  buttonPlaceholder: {
    height: 50, // Match ListAnItemBtn height
    backgroundColor: Colors.light.muted,
    borderRadius: 10,
    opacity: 0.2,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors.light.muted,
    borderRadius: 10,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.textSecondary,
    opacity: 0.2,
    marginRight: 15,
  },
  labelPlaceholder: {
    height: 18,
    width: "60%",
    backgroundColor: Colors.light.textSecondary,
    borderRadius: 4,
    opacity: 0.2,
  },
});

export default SkeletonProfileLoader;

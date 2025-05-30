import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { CustomStats } from "./stats";

interface IdentityCardProps {
  user: {
    name: string;
    handle: string;
    avatar: any;
    bio: string;
    joinDate: string;
    stats: {
      listed: number;
      borrowed: number;
      rating: number;
      reviewsCount: number;
    };
  };
}

export const IdentityCard = ({ user }: IdentityCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={user.avatar} style={styles.avatar} />
      <View style={styles.textSection}>
        <CustomText style={styles.name}>{user.name}</CustomText>
        <CustomText style={styles.handle}>{user.handle}</CustomText>
        <CustomText numberOfLines={2} style={styles.bio}>
          {user.bio}
        </CustomText>
        <CustomText style={styles.joined}>
          Joined {new Date(user.joinDate).toLocaleDateString()}
        </CustomText>
        <View style={styles.statsRow}>
          <CustomStats label="Listed" value={user.stats.listed} />
          <CustomStats label="Borrowed" value={user.stats.borrowed} />
          <CustomStats
            label="Rating"
            value={`${user.stats.rating} ⭐ (${user.stats.reviewsCount})`}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.light.surfaceArea,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 100,
    marginRight: 16,
  },
  textSection: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  handle: {
    color: "#666",
    marginBottom: 4,
  },
  bio: {
    color: "#333",
    marginBottom: 4,
  },
  joined: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

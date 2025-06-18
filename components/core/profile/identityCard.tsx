import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { avatarsT } from "@/types";
import { getPlanColor } from "@/utils";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomStats } from "./stats";

interface IdentityCardProps {
  user: {
    name: string;
    handle: string;
    avatar: any;
    bio: string;
    join_date: string;
    subscription_plan: string;
    stats: {
      listed: number;
      borrowed: number;
      rating: number;
      reviewsCount: any;
    };
  };
  showPlan?: boolean;
  func?: () => void;
}

const avatars: avatarsT = [
  { id: "avatar1", src: require("../../../assets/img/avatar.png") },
  { id: "avatar2", src: require("../../../assets/img/avatar2.png") },
];

export const IdentityCard = ({ user, showPlan, func }: IdentityCardProps) => {
  const avatar = avatars.find((a) => a.id === user.avatar);

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={avatar?.src} style={styles.avatar} />
      <View style={styles.textSection}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <CustomText style={styles.name}>{user.name}</CustomText>
            <CustomText style={styles.handle}>{user.handle}</CustomText>
          </View>

          {showPlan && user.subscription_plan && (
            <TouchableOpacity
              onPress={func}
              style={[
                styles.planBadge,
                { borderColor: getPlanColor(user.subscription_plan) },
              ]}
            >
              <CustomText
                style={[
                  styles.planText,
                  { color: getPlanColor(user.subscription_plan) },
                ]}
              >
                {user.subscription_plan} plan
              </CustomText>
            </TouchableOpacity>
          )}
        </View>

        <CustomText numberOfLines={2} style={styles.bio}>
          {user.bio}
        </CustomText>
        <CustomText style={styles.joined}>
          Joined {new Date(user.join_date).toLocaleDateString()}
        </CustomText>
        <View style={styles.statsRow}>
          <CustomStats label="Listed" value={user.stats.listed} />
          <CustomStats label="Borrowing" value={user.stats.borrowed} />
          <CustomStats label="Rating" value={`⭐ ${user.stats.rating}`} />
        </View>
      </View>
    </TouchableOpacity>
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
  planBadge: {
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  planText: {
    fontSize: 12,
    fontFamily: "Satoshi-Bold",
    textTransform: "capitalize",
  },
});

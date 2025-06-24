import CustomText from "@/components/ui/customText";
import { t } from "@/localization/t";
import { avatarsT } from "@/types";
import { getPlanColor, themeColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
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
  const bg = themeColor("surfaceArea");
  const text = themeColor("text");
  const textSecondary = themeColor("textSecondary");
  const textTertiary = themeColor("textTertiery");
  const avatar = avatars.find((a) => a.id === user.avatar);

  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <View style={styles.avatarContainer}>
        <Image source={avatar?.src} style={styles.avatar} />

        {user.subscription_plan !== "free" && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: getPlanColor(user.subscription_plan),
                borderColor: bg,
              },
            ]}
          >
            <Ionicons
              name={user.subscription_plan === "pro" ? "star" : "diamond"}
              size={12}
              color="#fff"
            />
          </View>
        )}
      </View>
      <View style={styles.textSection}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <CustomText
              style={[styles.name, { color: text }]}
              numberOfLines={1}
            >
              {user.name}
            </CustomText>
            <CustomText
              style={[styles.handle, { color: textSecondary }]}
              numberOfLines={1}
            >
              {user.handle}
            </CustomText>
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

        <CustomText
          numberOfLines={2}
          style={[styles.bio, { color: textTertiary }]}
        >
          {user.bio}
        </CustomText>
        <CustomText style={styles.joined}>
          {t("profile.cardJoined")}{" "}
          {new Date(user.join_date).toLocaleDateString()}
        </CustomText>
        <View style={styles.statsRow}>
          <CustomStats label={t("listings.title")} value={user.stats.listed} />
          <CustomStats
            label={t("profile.cardBorrow")}
            value={user.stats.borrowed}
          />
          <CustomStats
            label={t("profile.cardRating")}
            value={`⭐ ${user.stats.rating}`}
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
    fontSize: 17,
    fontFamily: "Satoshi-Bold",
  },
  handle: {
    marginBottom: 4,
  },
  bio: {
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
  avatarContainer: {
    position: "relative",
    width: 72,
    height: 72,
    marginRight: 16,
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
});

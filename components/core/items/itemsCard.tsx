import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { useUserData } from "@/context/userContext";
import {
  useAddFavorite,
  useIsFavorited,
  useRemoveFavorite,
} from "@/hooks/useFavorite";
import { themeColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FC } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SubscriptionBadge } from "../profile/subscriptionBadge";

interface ItemsCardProps {
  id: string;
  image: any[];
  title: string;
  description: string;
  distance: string;
  owner?: {
    id?: string;
    name?: string;
    avatar?: any;
    contact?: string;
    subscription_plan: string;
  };
  ownerId?: string;
  subscription_plan?: string;
}

export const ItemsCard: FC<ItemsCardProps> = ({
  id,
  image,
  title,
  description,
  distance,
  owner,
  ownerId,
  subscription_plan,
}) => {
  const text = themeColor("text");
  const textSecondary = themeColor("textSecondary");
  const { userData } = useUserData();
  const router = useRouter();
  const hideFavorite = userData.id === owner?.id || ownerId;

  const { data: isFavorited, isLoading: isLoadingFavorite } = useIsFavorited(
    userData.id,
    id
  );
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const userSub = owner?.subscription_plan || subscription_plan;

  const toggleFavorite = () => {
    if (!userData?.id || !id) return;

    if (isFavorited) {
      removeFavorite.mutate({ user_id: userData.id, listing_id: id });
    } else {
      addFavorite.mutate({ user_id: userData.id, listing_id: id });
    }
  };

  const handlePress = () => {
    if (!id) return;
    router.push({
      pathname: `/items/[id]`,
      params: { id: id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={image[0]} style={styles.image} contentFit="cover" />
        {userSub && <SubscriptionBadge plan={userSub} />}
        {!hideFavorite && (
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={toggleFavorite}
            disabled={
              addFavorite.isPending ||
              removeFavorite.isPending ||
              isLoadingFavorite
            }
          >
            {isLoadingFavorite ? (
              <ActivityIndicator size={16} color="#A0A0A0" />
            ) : (
              <Ionicons
                name={isFavorited ? "heart" : "heart-outline"}
                size={22}
                color={isFavorited ? "#FF4D67" : "#A0A0A0"}
              />
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <CustomHeading
          numberOfLines={1}
          style={[styles.title, { color: text }]}
        >
          {title}
        </CustomHeading>
        <View style={{ marginTop: 5 }}>
          <CustomText
            style={[styles.description, { color: textSecondary }]}
            numberOfLines={1}
          >
            {description}
          </CustomText>
          <CustomText style={styles.distance}>{distance}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    elevation: 1,
    overflow: "hidden",
    marginRight: 5,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  content: {
    paddingTop: 5,
  },
  title: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  distance: {
    fontSize: 12,
    color: "#999",
  },
  favoriteIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    zIndex: 1,
    elevation: 5,
  },
});

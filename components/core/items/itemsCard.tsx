import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import {
  useAddFavorite,
  useIsFavorited,
  useRemoveFavorite,
} from "@/hooks/useFavorite";
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

interface ItemsCardProps {
  id: string;
  image: any[];
  title: string;
  description: string;
  distance: string;
  owner?: {
    id: string;
    name: string;
    avatar: any;
    contact: string;
  };
}

export const ItemsCard: FC<ItemsCardProps> = ({
  id,
  image,
  title,
  description,
  distance,
  owner,
}) => {
  const { userData } = useUserData();
  const router = useRouter();
  const hideFavorite = userData.id === owner?.id;

  const { data: isFavorited, isLoading: isLoadingFavorite } = useIsFavorited(
    userData.id,
    id
  );
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

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
        <CustomHeading numberOfLines={1} style={[styles.title]}>
          {title}
        </CustomHeading>
        <View style={{ marginTop: 5 }}>
          <CustomText style={styles.description} numberOfLines={1}>
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
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
    color: Colors.light.textSecondary,
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

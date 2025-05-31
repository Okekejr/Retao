import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ItemsCardProps {
  id: string;
  image: any[];
  title: string;
  description: string;
  distance: string;
  favorited?: boolean;
}

export const ItemsCard: FC<ItemsCardProps> = ({
  id,
  image,
  title,
  description,
  distance,
  favorited,
}) => {
  const router = useRouter();
  const [favorite, setFavorite] = useState(favorited);

  const toggleFavorite = () => {
    setFavorite(!favorited);
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
        <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={22}
            color={favorite ? "#FF4D67" : "#A0A0A0"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <CustomHeading numberOfLines={1} style={[styles.title]}>
          {title}
        </CustomHeading>
        <CustomText style={styles.description} numberOfLines={1}>
          {description}
        </CustomText>
        <CustomText style={styles.distance}>{distance}</CustomText>
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
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginVertical: 4,
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

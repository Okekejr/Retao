import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { themeColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SectionImgCarousel } from "./sectionImgCarousel";

interface SectionCardProps {
  id: string;
  image: any[];
  title: string;
  description: string;
  distance: string;
  favorited: boolean;
}

export const SectionCard: FC<SectionCardProps> = ({
  id,
  image,
  title,
  description,
  distance,
  favorited,
}) => {
  const router = useRouter();
  const [isScrolling, setIsScrolling] = useState(false);
  const [favorite, setFavorite] = useState(favorited);
  const textSec = themeColor("textSecondary");
  const text = themeColor("text");

  const toggleFavorite = () => {
    setFavorite(!favorited);
  };

  const handlePress = () => {
    if (!isScrolling && id) {
      router.push({
        pathname: `/items/[id]`,
        params: { id },
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.9}
      disabled={isScrolling}
    >
      <View style={styles.imageContainer}>
        <SectionImgCarousel images={image} setIsScrolling={setIsScrolling} />
        <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={22}
            color={favorite ? "#FF4D67" : "#A0A0A0"}
          />
        </TouchableOpacity>
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
            style={[styles.description, { color: textSec }]}
            numberOfLines={1}
          >
            {description}
          </CustomText>
          <CustomText style={[styles.distance, { color: textSec }]}>
            {distance}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
    marginRight: 5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  content: {
    paddingTop: 10,
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

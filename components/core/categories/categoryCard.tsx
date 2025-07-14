import CustomText from "@/components/ui/customText";
import { categoriesIcon } from "@/constants/random";
import { themeColor } from "@/utils";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CategoryCardProps {
  id: string;
  icon: any;
  title: string;
}

export const CategoryCard = ({ id, icon, title }: CategoryCardProps) => {
  const text = themeColor("text");
  const router = useRouter();

  const iconObj = categoriesIcon.find((i) => i.id === icon);

  const handlePress = () => {
    Haptics.selectionAsync();
    router.push({
      pathname: `/category/[id]`,
      params: { id: id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={iconObj?.icon} style={styles.image} contentFit="cover" />
      <CustomText style={[styles.title, { color: text }]}>{title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
});

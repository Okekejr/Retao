import CustomText from "@/components/ui/customText";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CategoryCardProps {
  id: string;
  icon: any;
  title: string;
}

export const CategoryCard = ({ id, icon, title }: CategoryCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: `/category/[id]`,
      params: { id: id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={icon} style={styles.image} contentFit="cover" />
      <CustomText style={styles.title}>{title}</CustomText>
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
    fontFamily: "Inter-Regular",
    textAlign: "center",
    color: "#1A1A1A",
  },
});

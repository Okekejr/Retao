import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { HistoryItem } from "@/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface HistoryCardProps {
  item: HistoryItem["item"];
  index: number;
  type: HistoryItem["type"];
}

export const HistoryCard = ({ item, index, type }: HistoryCardProps) => {
  const router = useRouter();

  const handlePressItem = (id: string) => {
    if (!id) return;
    router.push({ pathname: "/items/[id]", params: { id: id } });
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 60, type: "timing" }}
    >
      <View style={{ alignItems: "center", paddingBottom: 2 }}>
        <CustomText style={styles.type}>{type}</CustomText>
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handlePressItem(item.id)}
      >
        <Image source={{ uri: item.images[0] }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <CustomText style={styles.cardTitle}>{item.title}</CustomText>
          <CustomText style={styles.cardDescription} numberOfLines={1}>
            {item.description}
          </CustomText>
          <CustomText style={styles.cardDistance}>{item.distance}</CustomText>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#FAFAF5",
    borderRadius: 12,
    padding: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  type: {
    fontFamily: "Satoshi-Bold",
    fontSize: 12,
    color: Colors.light.primary,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
    color: "#000",
  },
  cardDescription: {
    color: "#666",
    fontSize: 12,
  },
  cardDistance: {
    color: "#999",
    fontSize: 10,
  },
});

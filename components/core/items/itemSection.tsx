import CustomHeading from "@/components/ui/customHeading";
import { h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { ListingsT } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ItemsCard } from "./itemsCard";

interface ItemSectionProps {
  heading: string;
  data: ListingsT;
  loc?: string | undefined;
}

export const ItemSection: FC<ItemSectionProps> = ({ heading, data, loc }) => {
  const [finalList, setFinalList] = useState<ListingsT>([]);
  const { userData } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setFinalList(
        data
          .filter((item) => item.owner.id !== userData.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
      );
    }
  }, [data]);

  const handlePress = () => {
    loc
      ? router.push({
          pathname: `/listingSection/listedByLocation`,
          params: { heading: heading, location: loc },
        })
      : router.push({
          pathname: `/listingSection/listedAll`,
          params: { heading: heading },
        });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.headerContainer} onPress={handlePress}>
        <CustomHeading style={h3}>{heading}</CustomHeading>
        <Ionicons name="chevron-forward-outline" size={12} />
      </Pressable>

      <FlatList
        data={finalList}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ItemsCard
            id={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            distance={item.distance}
            owner={item.owner}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 15,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  listContent: {
    gap: 6,
  },
});

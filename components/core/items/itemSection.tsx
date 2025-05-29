import CustomHeading from "@/components/ui/customHeading";
import { h3, mockItemsT } from "@/constants/random";
import { FlatList, StyleSheet, View } from "react-native";
import { ItemsCard } from "./itemsCard";

interface ItemSectionProps {
  heading: string;
  data: mockItemsT;
}

export const ItemSection = ({ heading, data }: ItemSectionProps) => {
  return (
    <View style={styles.container}>
      <CustomHeading style={h3}>{heading}</CustomHeading>

      <FlatList
        data={data}
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
            favorited={item.favorited}
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
  listContent: {
    gap: 12,
  },
});

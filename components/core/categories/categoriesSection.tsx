import CustomHeading from "@/components/ui/customHeading";
import { h3 } from "@/constants/random";
import { Categories } from "@/types";
import { StyleSheet, View } from "react-native";
import { CategoryCard } from "./categoryCard";

interface CategoriesSectionProps {
  title: string;
  data: Categories;
}

export const CategoriesSection = ({ title, data }: CategoriesSectionProps) => {
  return (
    <View style={styles.container}>
      <CustomHeading style={h3}>{title}</CustomHeading>

      <View style={styles.grid}>
        {data.map((item) => (
          <CategoryCard key={item.id} {...item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 15,
    paddingBottom: 80,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

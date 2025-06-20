import CustomHeading from "@/components/ui/customHeading";
import { h3 } from "@/constants/random";
import { Categories } from "@/types";
import { themeColor } from "@/utils";
import { StyleSheet, View } from "react-native";
import { CategoryCard } from "./categoryCard";

interface CategoriesSectionProps {
  title: string;
  data: Categories;
}

export const CategoriesSection = ({ title, data }: CategoriesSectionProps) => {
  const text = themeColor("text");

  return (
    <View style={styles.container}>
      <CustomHeading style={[h3, { color: text }]}>{title}</CustomHeading>

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

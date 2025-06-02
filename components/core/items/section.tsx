import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { h3 } from "@/constants/random";
import { ListingsT } from "@/types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SectionCard } from "./sectionCard";

interface SectionProps {
  heading: string;
  data: ListingsT;
}

export const Section = ({ heading, data }: SectionProps) => {
  const [listings, setListings] = useState<ListingsT>([]);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const LIMIT = 6;

  useEffect(() => {
    if (!data) return;

    // Only reset listings if data actually changed (by length or content)
    const initialSlice = data.slice(0, LIMIT);
    const initialIds = initialSlice.map((item) => item.id).join(",");
    const currentIds = listings
      .slice(0, LIMIT)
      .map((item) => item.id)
      .join(",");

    if (initialIds !== currentIds) {
      setListings(initialSlice);
      setOffset(LIMIT);
    }
  }, [data]);

  const loadMore = () => {
    if (!data || loadingMore || offset >= data.length) return;

    setLoadingMore(true);
    setTimeout(() => {
      const newItems = data.slice(offset, offset + LIMIT);

      // Prevent duplicates
      setListings((prev) => {
        const combined = [...prev, ...newItems];
        const unique = Array.from(
          new Map(combined.map((item) => [item.id, item])).values()
        );
        return unique;
      });

      setOffset((prev) => prev + LIMIT);
      setLoadingMore(false);
    }, 300);
  };

  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={h3}>{heading}</CustomText>
        <CustomText>Over ({data?.length}) items</CustomText>
      </View>

      <FlatList
        data={listings}
        renderItem={({ item }) => <SectionCard {...item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingBottom: 200, gap: 30 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loadingMore ? (
            <CustomText style={{ textAlign: "center" }}>Loading...</CustomText>
          ) : null
        }
      />
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    alignItems: "center",
    marginBottom: 15,
  },
  grid: {
    flexDirection: "column",
    gap: 40,
  },
});

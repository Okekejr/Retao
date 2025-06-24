import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { h3 } from "@/constants/random";
import { ListingsT } from "@/types";
import { themeColor } from "@/utils";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { t } from "../../../localization/t";
import { SectionCard } from "./sectionCard";

interface SectionProps {
  heading: string;
  data: ListingsT;
}

export const Section = ({ heading, data }: SectionProps) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);

  const visibleListings = data.slice(0, visibleCount);
  const hasMore = visibleCount < data.length;
  const text = themeColor("text");

  const loadMore = () => {
    if (!hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoadingMore(false);
    }, 500); // simulate async delay, remove if not needed
  };

  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={[h3, { color: text }]}>{heading}</CustomText>
        <CustomText style={{ color: text }}>
          {t("listedAll.title", { amount: data?.length })}
        </CustomText>
      </View>

      <FlatList
        data={visibleListings}
        renderItem={({ item }) => <SectionCard {...item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingBottom: 200, gap: 30 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loadingMore ? (
            <TouchableOpacity onPress={loadMore}>
              <CustomText>
                {loadingMore ? "Loading..." : "Load more"}
              </CustomText>
            </TouchableOpacity>
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

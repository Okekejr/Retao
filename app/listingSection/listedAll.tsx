import { Section } from "@/components/core/items/section";
import { BackButton } from "@/components/ui/backButton";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useGetFeaturedListings, useGetListings } from "@/hooks/useGetListings";
import { useGetLocation } from "@/hooks/useGetLocation";
import { ListingsT } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function ListedAllScreen() {
  const { userData } = useUserData();
  const { heading } = useLocalSearchParams();
  const { data: Listings } = useGetListings();
  const { data: location } = useGetLocation();
  const { data: featuredListings, isLoading: featuredLoading } =
    useGetFeaturedListings(location);
  const [finalList, setFinalList] = useState<ListingsT>([]);

  if (!Listings || !featuredListings) return;

  useEffect(() => {
    if (heading === "Featured") {
      setFinalList(featuredListings.slice(0, 5));
    } else {
      const filterUser = Listings.filter(
        (item) => item.owner.id !== userData.id
      );
      setFinalList(filterUser);
    }
  }, [heading, Listings, featuredListings, userData.id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconRow}>
        <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      </View>

      {Listings && <Section heading={heading as string} data={finalList} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: Colors.light.background,
  },
  iconRow: {
    position: "absolute",
    left: 20,
    top: 60,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

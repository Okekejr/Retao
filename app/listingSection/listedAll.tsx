import { Section } from "@/components/core/items/section";
import { BackButton } from "@/components/ui/backButton";
import { useUserData } from "@/context/userContext";
import { useGetFeaturedListings, useGetListings } from "@/hooks/useGetListings";
import { useGetLocation } from "@/hooks/useGetLocation";
import { ListingsT } from "@/types";
import { themeColor } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default function ListedAllScreen() {
  const bg = themeColor("background");
  const { userData } = useUserData();
  const { heading } = useLocalSearchParams();
  const { data: location, isLoading: locLoading } = useGetLocation();
  const { data: Listings, isLoading: listingLoading } = useGetListings(
    true,
    userData.location ? userData.location : undefined
  );
  const { data: featuredListings, isLoading: featuredLoading } =
    useGetFeaturedListings(location);
  const [finalList, setFinalList] = useState<ListingsT>([]);

  const anyLoading = listingLoading || locLoading || featuredLoading;

  useEffect(() => {
    const normalizedHeading =
      typeof heading === "string"
        ? heading.toLowerCase()
        : Array.isArray(heading) && heading.length > 0
        ? heading[0].toLowerCase()
        : undefined;
    if (
      normalizedHeading === "featured" ||
      normalizedHeading === "destacados"
    ) {
      setFinalList(featuredListings ? featuredListings.slice(0, 5) : []);
    } else {
      const filterUser = Listings
        ? Listings.filter(
            (item) => !userData.id || item.owner.id !== userData.id
          )
        : [];
      setFinalList(filterUser);
    }
  }, [heading, Listings, featuredListings, userData.id, userData.location]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {anyLoading || !Listings || !featuredListings ? (
        <View
          style={[
            { flex: 1, justifyContent: "center", alignItems: "center" },
            { backgroundColor: bg },
          ]}
        >
          <Animatable.View animation="bounceIn">
            <LottieView
              source={require("../../assets/loading.json")}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          </Animatable.View>
        </View>
      ) : (
        <>
          <View style={styles.iconRow}>
            <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
          </View>

          {Listings && <Section heading={heading as string} data={finalList} />}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
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
  lottie: {
    width: 200,
    height: 200,
  },
});

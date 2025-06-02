import { Section } from "@/components/core/items/section";
import { BackButton } from "@/components/ui/backButton";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useGetListings } from "@/hooks/useGetListings";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function ListedAllScreen() {
  const { userData } = useUserData();
  const { heading } = useLocalSearchParams();
  const { data: Listings } = useGetListings();

  if (!Listings) return;

  const filterUser = Listings.filter((item) => item.owner.id !== userData.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconRow}>
        <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      </View>

      {Listings && <Section heading={heading as string} data={filterUser} />}
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

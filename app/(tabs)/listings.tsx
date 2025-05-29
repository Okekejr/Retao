import { ItemsCard } from "@/components/core/items/itemsCard";
import SelectCategory from "@/components/core/listing/selectCategory";
import { CustomModal } from "@/components/ui/customModal";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { useListing } from "@/context/listingContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const mockListings = [
  {
    id: "1",
    title: "Power Drill",
    status: "listed",
    images: [require("../../assets/img/drill.png")],
    description: "Hello there",
    location: "Monterrey",
  },
  {
    id: "2",
    title: "Camping Tent",
    status: "borrowed",
    images: [require("../../assets/img/drill.png")],
    description: "Hello there",
    location: "Monterrey",
  },
  {
    id: "3",
    title: "Screw Drill",
    status: "listed",
    images: [require("../../assets/img/drill.png")],
    description: "Hello there",
    location: "Monterrey",
  },
];

export default function ListingsScreen() {
  const { formData } = useListing();
  const [modalVisible, setModalVisible] = useState(false);

  const listedItems = mockListings.filter((item) => item.status === "listed");
  const borrowedItems = mockListings.filter(
    (item) => item.status === "borrowed"
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ gap: 12 }}>
        <View>
          <Header headerTitle="Listings" />

          <TouchableOpacity style={styles.ctaButton} onPress={openModal}>
            <Ionicons name="cube-outline" size={28} style={styles.ctaIcon} />
            <View>
              <CustomText style={styles.ctaTitle}>List an item</CustomText>
              <CustomText style={styles.ctaSubtitle}>
                It's fast and easy to get started
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>

        {listedItems.length > 0 && (
          <View>
            <CustomText style={[styles.heading, h3]}>My Listings</CustomText>
            <FlatList
              data={listedItems}
              keyExtractor={(item) => item.title}
              scrollEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <ItemsCard
                  id="5"
                  image={item.images}
                  title={item.title}
                  description={item.description}
                  distance={item.location}
                  favorited
                />
              )}
            />
          </View>
        )}

        {borrowedItems.length > 0 && (
          <View>
            <CustomText style={[styles.heading, h3]}>Borrowed</CustomText>
            <FlatList
              data={borrowedItems}
              keyExtractor={(item) => item.title}
              scrollEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <ItemsCard
                  id="5"
                  image={item.images}
                  title={item.title}
                  description={item.description}
                  distance={item.location}
                  favorited
                />
              )}
            />
          </View>
        )}

        <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
          <SelectCategory closeModal={closeModal} />
        </CustomModal>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 20,
  },
  icon: {
    backgroundColor: Colors.light.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 4,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ctaIcon: {
    marginRight: 12,
    color: "#fff",
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  ctaSubtitle: {
    fontSize: 13,
    color: "#f0f0f0",
    marginTop: 2,
  },
  listContent: {
    gap: 12,
  },
});

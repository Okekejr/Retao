import { ItemsCard } from "@/components/core/items/itemsCard";
import { ListAnItemBtn } from "@/components/core/listing/listAnItemBtn";
import SelectCategory from "@/components/core/listing/selectCategory";
import { CustomModal } from "@/components/ui/customModal";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { useGetListings } from "@/hooks/useGetListings";
import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

export default function ListingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const { userData } = useUserData();
  const { data: listings = [] } = useGetListings(undefined, userData?.id);

  const listedItems =
    listings?.filter((item) => item.owner?.id === userData.id) ?? [];

  const borrowedItems = listings.filter(
    (item) => item.borrower?.id === userData.id
  );

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ gap: 16 }}>
        <View>
          <Header headerTitle="Listings" />

          <ListAnItemBtn openModal={() => openModal("createListing")} />

          <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
            {content === "createListing" && (
              <SelectCategory closeModal={closeModal} />
            )}
          </CustomModal>
        </View>

        <View>
          <CustomText style={[styles.heading, h3]}>My Listings</CustomText>
          {listedItems.length > 0 ? (
            <FlatList
              data={listedItems}
              keyExtractor={(item) => item.title}
              scrollEnabled
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
          ) : (
            <CustomText>No listed items yet</CustomText>
          )}
        </View>

        <View>
          <CustomText style={[styles.heading, h3]}>Borrowed</CustomText>
          {borrowedItems.length > 0 ? (
            <FlatList
              data={borrowedItems}
              keyExtractor={(item) => item.title}
              scrollEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
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
          ) : (
            <CustomText>No borrowed items yet</CustomText>
          )}
        </View>
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
  listContent: {
    gap: 12,
  },
});

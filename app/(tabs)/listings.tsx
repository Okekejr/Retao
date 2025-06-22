import { ItemsCard } from "@/components/core/items/itemsCard";
import { RequestCard } from "@/components/core/items/requestCard";
import { ListAnItemBtn } from "@/components/core/listing/listAnItemBtn";
import SelectCategory from "@/components/core/listing/selectCategory";
import { CustomModal } from "@/components/ui/customModal";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import {
  useBorrowerPendingRequests,
  useIncomingBorrowRequests,
} from "@/hooks/useBorrowRequests";
import { useGetListings } from "@/hooks/useGetListings";
import { themeColor } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function ListingsScreen() {
  const bg = themeColor("background");
  const text = themeColor("text");
  const textSec = themeColor("textSecondary");
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const { userData } = useUserData();
  const queryClient = useQueryClient();
  const { data: listings = [], isLoading: listingsLoading } = useGetListings(
    undefined,
    userData?.id,
    undefined
  );
  const { data: requests, isLoading: requestLoading } =
    useIncomingBorrowRequests();
  const { data: pendingRequests, isLoading: pendingRequestsLoading } =
    useBorrowerPendingRequests();

  const isAnyLoading =
    requestLoading || listingsLoading || pendingRequestsLoading;

  const listedItems =
    listings?.filter((item) => item.owner?.id === userData.id).slice(0, 5) ??
    [];

  const borrowedItems =
    listings.filter((item) => item.borrower?.id === userData.id).slice(0, 5) ??
    [];

  const filterRequests = requests?.filter((item) => item.status === "pending");

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = () => setModalVisible(false);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            "favorites",
            "listings",
            "listing",
            "isFavorited",
            "incomingBorrowRequests",
            "borrowerRequests",
          ].includes(query.queryKey[0] as string),
      });
    }, [queryClient])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {isAnyLoading && (
        <View style={[styles.loaderOverlay, { backgroundColor: bg }]}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      )}

      <InnerContainer style={{ marginTop: 20 }}>
        <Header headerTitle="Listings" />

        {userData.subscription_plan === "unlimited" ||
        userData.stats.listed < userData.listing_limit ? (
          <ListAnItemBtn openModal={() => openModal("createListing")} />
        ) : (
          <ListAnItemBtn
            openModal={() => openModal("Plans")}
            title="Listing limit reached"
            subText="Upgrade your plan"
            icon="checkmark-done-circle-outline"
            limitReached
          />
        )}

        <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
          {content === "createListing" && (
            <SelectCategory closeModal={closeModal} />
          )}
        </CustomModal>
      </InnerContainer>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]}
        showsVerticalScrollIndicator={true}
      >
        <InnerContainer style={{ gap: 16, flex: 1 }}>
          <View>
            <CustomText style={[styles.heading, h3, { color: text }]}>
              My Listings
            </CustomText>
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
              <CustomText style={{ color: textSec }}>
                No listed items yet
              </CustomText>
            )}
          </View>

          {borrowedItems.length > 0 && (
            <View>
              <CustomText style={[styles.heading, h3, { color: text }]}>
                Borrowed
              </CustomText>
              <FlatList
                data={borrowedItems}
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
            </View>
          )}

          {filterRequests && filterRequests.length > 0 && (
            <View>
              <CustomText style={[styles.heading, h3, { color: text }]}>
                Requests
              </CustomText>

              <FlatList
                data={filterRequests}
                keyExtractor={(item) => item.id}
                scrollEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                  <RequestCard {...item} mode="owner" />
                )}
              />
            </View>
          )}

          {pendingRequests && pendingRequests.length > 0 && (
            <View>
              <CustomText style={[styles.heading, h3, { color: text }]}>
                My Pending Requests
              </CustomText>

              <FlatList
                data={pendingRequests}
                keyExtractor={(item) => item.id}
                scrollEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                  <RequestCard {...item} mode="borrower" />
                )}
              />
            </View>
          )}
        </InnerContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 10,
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
    gap: 6,
  },
  scrollContent: {
    paddingTop: 20,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

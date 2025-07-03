import { ItemsCard } from "@/components/core/items/itemsCard";
import { RequestCard } from "@/components/core/items/requestCard";
import { ListAnItemBtn } from "@/components/core/listing/listAnItemBtn";
import SelectCategory from "@/components/core/listing/selectCategory";
import { NotLogged } from "@/components/core/notLogged";
import { GetLoggedInModal } from "@/components/core/notLogged/getLoggedIn";
import { GetSiggnedUp } from "@/components/core/notLogged/getSignedUp";
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
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);

  const { userData } = useUserData();
  const queryClient = useQueryClient();

  const {
    data: listings = [],
    isLoading: listingsLoading,
    refetch: refetchListings,
  } = useGetListings(undefined, userData?.id, undefined);
  const {
    data: requests,
    isLoading: requestLoading,
    refetch: refetchRequests,
  } = useIncomingBorrowRequests();
  const {
    data: pendingRequests,
    isLoading: pendingRequestsLoading,
    refetch: refetchPendingRequests,
  } = useBorrowerPendingRequests();

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchListings(),
        refetchRequests(),
        refetchPendingRequests(),
      ]);
    } catch (error) {
      console.error("Refresh failed", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchListings, refetchRequests, refetchPendingRequests]);

  useFocusEffect(
    useCallback(() => {
      if (userData.isLoggedIn) {
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
      }
    }, [queryClient])
  );

  useEffect(() => {
    if (userData.isLoggedIn) {
      onRefresh();
    }
  }, [userData.isLoggedIn]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {(!userData.isLoggedIn || !isAnyLoading) && (
        <InnerContainer style={{ gap: 12, marginTop: 20 }}>
          <Header
            headerTitle={t("listings.title")}
            style={{ marginBottom: 12 }}
          />

          {!userData.isLoggedIn ? (
            <>
              <NotLogged
                title={t("listings.notLoggedIn.title")}
                subTitle={t("listings.notLoggedIn.subTitle")}
                func={() => openModal("Login")}
              />

              <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
                {content === "Login" && (
                  <GetLoggedInModal closeModal={closeModal} func={openModal} />
                )}

                {content === "Signup" && (
                  <GetSiggnedUp closeModal={closeModal} func={openModal} />
                )}
              </CustomModal>
            </>
          ) : (
            <>
              {userData.subscription_plan === "unlimited" ||
              userData.stats.listed < userData.listing_limit ? (
                <ListAnItemBtn openModal={() => openModal("createListing")} />
              ) : (
                <ListAnItemBtn
                  openModal={() => openModal("Plans")}
                  title={t("listings.listLimitTitle")}
                  subText={t("listings.listLimitSubTitle")}
                  icon="checkmark-done-circle-outline"
                  limitReached
                />
              )}

              <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
                {content === "createListing" && (
                  <SelectCategory closeModal={closeModal} />
                )}
              </CustomModal>

              <ScrollView
                contentContainerStyle={[
                  styles.scrollContent,
                  { paddingBottom: 80 },
                ]}
                showsVerticalScrollIndicator={true}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.light.primary]}
                    tintColor={Colors.light.primary}
                  />
                }
              >
                <View style={{ gap: 16 }}>
                  <View>
                    <CustomText style={[styles.heading, h3, { color: text }]}>
                      {t("listings.myListings")}
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
                        {t("listings.noListings")}
                      </CustomText>
                    )}
                  </View>

                  {borrowedItems.length > 0 && (
                    <View>
                      <CustomText style={[styles.heading, h3, { color: text }]}>
                        {t("listings.borrowedListings")}
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
                        {t("listings.requests")}
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
                        {t("listings.myPending")}
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
                </View>
              </ScrollView>
            </>
          )}
        </InnerContainer>
      )}
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

import { ItemImagesCarousel } from "@/components/core/items/itemImgCarousel";
import {
  RenderButton,
  RenderTimeline,
  StatusBadge,
} from "@/components/core/items/itemsDetails";
import { RatingModal } from "@/components/core/items/rating/ratingModal";
import { BorrowersCard } from "@/components/core/profile/borrowerCard";
import { SubscriptionBadge } from "@/components/core/profile/subscriptionBadge";
import { BackButton } from "@/components/ui/backButton";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { h2, h3, UserRole } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import {
  useBorrowRequestByItem,
  useRequestToBorrow,
  useUpdateBorrowRequest,
} from "@/hooks/useBorrowRequests";
import { useGetListingById } from "@/hooks/useGetListings";
import { useBorrowerHistory } from "@/hooks/useGetUserData";
import { useSubmitRatings } from "@/hooks/useRatings";
import { avatarsT, Listing } from "@/types";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

const avatars: avatarsT = [
  { id: "avatar1", src: require("../../assets/img/avatar.png") },
  { id: "avatar2", src: require("../../assets/img/avatar2.png") },
];

export default function ItemScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userData } = useUserData();
  const { data: selectedItem, isLoading } = useGetListingById(id as string);
  const { data: borrowRequestData } = useBorrowRequestByItem(id as string);
  const { mutate: requestToBorrow } = useRequestToBorrow();
  const { mutate: markAsReturnedMutation, isPending } =
    useUpdateBorrowRequest();
  const { data: borrwerHistory } = useBorrowerHistory(id as string);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const { mutate: submitRatingMutation, isPending: pendingRating } =
    useSubmitRatings();
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [borrowerForRating, setBorrowerForRating] = useState<Listing | null>(
    null
  );

  useEffect(() => {
    // Slide up animation
    Animated.timing(slideAnim, {
      toValue: height / 1.13, // Final position
      duration: 1000,
      useNativeDriver: false, // Use false for layout-related animations
    }).start();
  }, [slideAnim]);

  if (isLoading || !selectedItem) return;

  const userRole: UserRole =
    userData.id === selectedItem.owner.id
      ? "owner"
      : userData.id === selectedItem.borrower?.id
      ? "borrower"
      : "viewer";

  const userSub = selectedItem.owner.subscription_plan;

  const avatar = avatars.find((a) => a.id === selectedItem.owner.avatar);

  const handleEditListing = (itemId: string) => {
    router.push({ pathname: "/listings/editListings", params: { id: itemId } });
  };

  const handleMessageOwner = async () => {
    router.push({
      pathname: "/message/chatScreen",
      params: {
        recipientId: selectedItem.owner.id,
      },
    });
  };

  const handleRequestToBorrow = () => {
    requestToBorrow({ itemId: id as string });
  };

  const handleMarkAsReturned = () => {
    console.log("Borrower at time of mark:", selectedItem.borrower);
    if (!selectedItem?.borrower?.id) return;

    setBorrowerForRating(selectedItem);
    setShowRatingModal(true);
  };

  const handleSubmitRating = (rating: number) => {
    if (!borrowerForRating?.borrower?.id) return;

    // First submit rating
    submitRatingMutation(
      { rateeId: borrowerForRating.borrower?.id, rating },
      {
        onSuccess: () => {
          // Then mark the item as returned
          if (!borrowRequestData?.id) return;
          markAsReturnedMutation({
            requestId: borrowRequestData.id,
            status: "returned",
          });
        },
      }
    );

    setBorrowerForRating(null); // clear
  };

  const handleViewOwnerProfile = () => {
    if (!selectedItem.owner.id) return;
    router.push({
      pathname: "/userProfile/userProfileCard",
      params: { userId: selectedItem.owner.id },
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <ItemImagesCarousel images={selectedItem?.image} />

          <View style={styles.iconRow}>
            <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomHeading style={h2}>{selectedItem?.title}</CustomHeading>
              <SubscriptionBadge plan={userSub} inline />
            </View>
            {selectedItem?.status && (
              <StatusBadge status={selectedItem.status} />
            )}
          </View>
          <View>
            <CustomText style={styles.description}>
              {selectedItem?.description}
            </CustomText>

            <CustomText style={styles.metaText}>
              {selectedItem?.distance}
            </CustomText>
          </View>

          <View style={styles.ownerSection}>
            <Image
              source={avatar?.src}
              style={styles.avatar}
              contentFit="cover"
            />
            <CustomText
              style={styles.ownerName}
              onPress={handleViewOwnerProfile}
            >
              Shared by {selectedItem?.owner.name}
            </CustomText>
          </View>

          <CustomText style={styles.availability}>
            {selectedItem?.availability}
          </CustomText>

          {selectedItem?.status && (
            <RenderTimeline
              status={selectedItem.status}
              dueDate={selectedItem.borrower?.dueDate}
              releasedOn={selectedItem.borrower?.borrowedOn}
            />
          )}

          <View style={{ marginTop: 20 }}>
            <CustomText style={[styles.heading, h3]}>
              Borrowers History
            </CustomText>
            {borrwerHistory && borrwerHistory.length > 0 ? (
              <FlatList
                data={borrwerHistory}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                  <BorrowersCard
                    user={item}
                    onPress={() =>
                      router.push({
                        pathname: "/userProfile/userProfileCard",
                        params: { userId: item.id },
                      })
                    }
                  />
                )}
              />
            ) : (
              <CustomText>No borrowers yet.</CustomText>
            )}
          </View>
        </View>
      </ScrollView>

      <Animated.View style={[styles.hoverButton, { top: slideAnim }]}>
        {selectedItem?.status && (
          <RenderButton
            itemId={selectedItem.id}
            status={selectedItem?.status}
            userRole={userRole}
            isPending={isPending}
            func={{
              handleEditListing,
              handleMarkAsReturned,
              handleMessageOwner,
              handleRequestToBorrow,
            }}
          />
        )}
      </Animated.View>

      <RatingModal
        borrower={borrowerForRating?.borrower?.name}
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleSubmitRating}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    backgroundColor: Colors.light.background,
  },
  imageContainer: {
    width: "100%",
    height: height / 2.5,
    position: "relative",
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  favoriteIcon: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  description: {
    color: Colors.light.text,
  },
  metaText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  ownerSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  ownerName: {
    fontSize: 14,
    color: Colors.light.text,
  },
  availability: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "500",
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 10,
  },
  listContent: {
    gap: 12,
  },
  hoverButton: {
    position: "absolute", // Make the tab bar float
    width: width * 1,
    paddingTop: 0,
    marginTop: 0,
    height: 65, // Set the height
    borderRadius: 65 / 2, // Half of height to make it fully rounded
    paddingHorizontal: 20, // Add padding inside the pill
    borderTopWidth: 0,
    borderTopColor: "none",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
});

import { ItemImagesCarousel } from "@/components/core/items/itemImgCarousel";
import {
  RenderButton,
  RenderTimeline,
  StatusBadge,
} from "@/components/core/items/itemsDetails";
import { BackButton } from "@/components/ui/backButton";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { h2, mockItems, UserRole } from "@/constants/random";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

const currentUser = {
  contact: "@Okekejr",
};

export default function ItemScreen() {
  const { id } = useLocalSearchParams();
  const selectedItem = mockItems.find((item) => item.id === id);

  const userRole: UserRole =
    currentUser.contact === selectedItem?.owner.contact
      ? "owner"
      : currentUser.contact === selectedItem?.borrower?.contact
      ? "borrower"
      : "viewer";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <ItemImagesCarousel images={selectedItem?.image} />

        <View style={styles.iconRow}>
          <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
          <TouchableOpacity style={styles.favoriteIcon}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <CustomHeading style={h2}>{selectedItem?.title}</CustomHeading>
          {selectedItem?.status && <StatusBadge status={selectedItem.status} />}
        </View>
        <CustomText style={styles.description}>
          {selectedItem?.description}
        </CustomText>

        <CustomText style={styles.metaText}>
          {selectedItem?.distance} away
        </CustomText>

        <View style={styles.ownerSection}>
          <Image
            source={selectedItem?.owner.avatar}
            style={styles.avatar}
            contentFit="cover"
          />
          <CustomText style={styles.ownerName}>
            Shared by {selectedItem?.owner.name}
          </CustomText>
        </View>

        <CustomText style={styles.availability}>Available now</CustomText>

        {selectedItem?.status && (
          <RenderTimeline
            status={selectedItem.status}
            dueDate={selectedItem.borrower?.dueDate}
            releasedOn={selectedItem.borrower?.borrowedOn}
          />
        )}

        {selectedItem?.status && (
          <RenderButton status={selectedItem?.status} userRole={userRole} />
        )}
      </View>
    </ScrollView>
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
    color: Colors.light.muted,
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
    color: Colors.light.success,
    fontWeight: "500",
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: Colors.light.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
  secondaryButton: {
    marginTop: 10,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.light.primary,
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});

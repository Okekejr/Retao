import { BackButton } from "@/components/ui/backButton";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { h2, mockItems } from "@/constants/random";
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

export default function ItemScreen() {
  const { id } = useLocalSearchParams();
  const selectedItem = mockItems.find((item) => item.id === id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={selectedItem?.image}
          style={styles.image}
          contentFit="cover"
        />

        <View style={styles.iconRow}>
          <BackButton />
          <TouchableOpacity style={styles.favoriteIcon}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <CustomHeading style={h2}>{selectedItem?.title}</CustomHeading>
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

        <TouchableOpacity style={styles.primaryButton}>
          <CustomText style={styles.primaryButtonText}>
            Request to Borrow
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <CustomText style={styles.secondaryButtonText}>
            Message Owner
          </CustomText>
        </TouchableOpacity>
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
    fontWeight: "600",
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
    fontWeight: "600",
  },
});

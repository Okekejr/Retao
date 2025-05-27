import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

interface IntroCardListingProps {
  title: string;
  desc: string;
  image: any;
  index: number;
}

export const IntroCardListing = ({
  title,
  desc,
  image,
  index,
}: IntroCardListingProps) => {
  return (
    <View style={styles.stepCard}>
      <CustomText style={[h3, { fontSize: 16 }]}>{index}.</CustomText>

      <View style={styles.textGroup}>
        <CustomText style={[h3, styles.stepTitle]}>{title}</CustomText>
        <CustomText style={styles.stepDesc}>{desc}</CustomText>
      </View>

      <Image source={image} style={styles.listingImg} contentFit="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  stepCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  textGroup: {
    flex: 1,
    alignItems: "flex-start",
  },
  stepTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  listingImg: {
    width: 60,
    height: 55,
    borderRadius: 12,
  },
});

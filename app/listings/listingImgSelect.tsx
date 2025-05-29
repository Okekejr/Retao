import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { useListing } from "@/context/listingContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  DimensionValue,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function ListingImgSelectScreen() {
  const router = useRouter();
  const { formData, updateFormData } = useListing();
  const [images, setImages] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const invalid = images.length === 0;
    setDisabled(invalid);
  }, [images]);

  const progressPercentage: DimensionValue = `${
    (formData.current_step / formData.total_steps) * 100
  }%`;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      selectionLimit: 3,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selected = result.assets.map((asset) => asset.uri);
      // Limit to 3 images
      setImages((prev) => {
        const combined = [...prev, ...selected].slice(0, 3);
        return combined;
      });
    }
  };

  const handleBack = () => {
    updateFormData("current_step", formData.current_step - 1);
    router.back();
  };

  const handleNext = () => {
    try {
      updateFormData("current_step", formData.current_step + 1);
      updateFormData("images", images);
      router.push("/listings/listingSelect");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <CustomProgressBar progressPercentage={progressPercentage} />

            <CustomListingHeader
              heading="Add Photos of Your Item"
              subHeading="Upload up to 3 clear images to help others see what you’re
                sharing."
            />

            <View>
              <CustomText style={styles.label}>Select Images</CustomText>

              <View style={styles.imageSlotsContainer}>
                {[0, 1, 2].map((slot, index) => {
                  const image = images[index];

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={pickImage}
                      style={styles.imageSlot}
                      activeOpacity={0.8}
                    >
                      {image ? (
                        <Image
                          source={{ uri: image }}
                          style={styles.imagePreview}
                          contentFit="cover"
                        />
                      ) : (
                        <Ionicons name="add-outline" size={28} color="#999" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          <ListingButtons
            handleBack={handleBack}
            handleNext={handleNext}
            disabled={disabled}
          />
        </View>
      </InnerContainer>
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
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  imageSlotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  imageSlot: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.light.textSecondary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
});

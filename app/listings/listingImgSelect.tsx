import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { useListing } from "@/context/listingContext";
import { showToast } from "@/utils/showToast";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
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
  const [images, setImages] = useState<{ uri: string; sizeMB: number }[]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const hasNoImages = images.length === 0;
    const hasLargeImage = images.some((img) => img.sizeMB > 5);
    setDisabled(hasNoImages || hasLargeImage);

    const largeImage = images.find((img) => img.sizeMB > 5);
    if (largeImage) {
      showToast({
        type: "error",
        text1: "Image too large",
        message: "Each image must be 5MB or smaller.",
      });
    }
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
      const selectedWithSize = await Promise.all(
        result.assets.map(async (asset) => {
          const fileInfo = await FileSystem.getInfoAsync(asset.uri);
          const sizeMB =
            fileInfo.exists && fileInfo.size
              ? fileInfo.size / (1024 * 1024)
              : 0;

          return {
            uri: asset.uri,
            sizeMB: Number(sizeMB.toFixed(2)),
          };
        })
      );

      setImages((prev) => {
        const combined = [...prev, ...selectedWithSize].slice(0, 3);
        return combined;
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
                    <View key={index} style={styles.imageSlotWrapper}>
                      {image ? (
                        <>
                          <Image
                            source={{ uri: image.uri }}
                            style={styles.imagePreview}
                            contentFit="cover"
                          />
                          <TouchableOpacity
                            style={styles.removeIcon}
                            onPress={() => removeImage(index)}
                          >
                            <Ionicons
                              name="close-circle"
                              size={22}
                              color="red"
                            />
                          </TouchableOpacity>
                          <CustomText style={styles.imageSizeText}>
                            {image.sizeMB} MB
                          </CustomText>
                        </>
                      ) : (
                        <TouchableOpacity
                          onPress={pickImage}
                          style={styles.imageSlotEmpty}
                          activeOpacity={0.8}
                        >
                          <Ionicons name="add-outline" size={28} color="#999" />
                        </TouchableOpacity>
                      )}
                    </View>
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
    paddingHorizontal: 10,
  },
  imageSlotWrapper: {
    width: 100,
    height: 130, // slightly taller to fit size text
    position: "relative",
    alignItems: "center",
  },
  imageSlotEmpty: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.light.textSecondary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  imageSizeText: {
    fontSize: 12,
    marginTop: 4,
    color: "#555",
    textAlign: "center",
  },
  removeIcon: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#fff",
    borderRadius: 11,
    zIndex: 10,
  },
});

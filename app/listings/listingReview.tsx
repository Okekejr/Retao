import { InfoBlock } from "@/components/core/listing/infoBlock";
import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@/constants/random";
import { useListing } from "@/context/listingContext";
import { showToast } from "@/utils/showToast";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  DimensionValue,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function ListingReview() {
  const router = useRouter();
  const { formData, updateFormData, resetFormData } = useListing();
  const [loading, setLoading] = useState(false);

  const progressPercentage: DimensionValue = `${
    (formData.current_step / formData.total_steps) * 100
  }%`;

  const handleBack = () => {
    updateFormData("current_step", formData.current_step - 1);
    router.back();
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) throw new Error("No token found");

      console.log(formData.category_id);

      const formDataPayload = new FormData();

      formDataPayload.append("title", formData.title);
      formDataPayload.append("description", formData.description);
      formDataPayload.append("category", formData.category);
      formDataPayload.append("location", formData.location);
      formDataPayload.append("availability", formData.availability);
      formDataPayload.append("status", formData.status);
      formDataPayload.append("category_id", formData.category_id);

      formData.images.forEach((image: any, index: number) => {
        const imageUri = typeof image === "string" ? image : image.uri;

        formDataPayload.append("images", {
          uri: imageUri,
          name: `listing-image-${index}.jpg`,
          type: "image/jpeg",
        } as any);
      });

      const response = await fetch(`${BASE_URL}listings/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataPayload,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          showToast({
            type: "error",
            text1: "Listing limit reached",
            message: "You can only list up to 5 items. Upgrade to add more.",
          });
        } else {
          showToast({
            type: "error",
            text1: "Failed to create listing",
            message: data.error || "Something went wrong.",
          });
        }

        setLoading(false);
        resetFormData();
        router.push("/listings");
        return;
      }

      setLoading(false);
      console.log("Listing created:", data.listingId);

      router.push("/listings/listingSuccess");
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
              heading="Review Your Listing"
              subHeading="Here's everything you provided. Double-check and hit submit when you're ready!"
            />

            <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
              <InfoBlock label="Title" value={formData.title} />
              <InfoBlock label="Description" value={formData.description} />
              <InfoBlock label="Category" value={formData.category} />
              <InfoBlock label="Availability" value={formData.availability} />
              <InfoBlock label="Location" value={formData.location} />
            </ScrollView>

            <View>
              {formData.images?.length > 0 && (
                <View style={{ marginVertical: 10 }}>
                  <CustomText style={styles.label}>Images</CustomText>
                  <View style={styles.imageRow}>
                    {formData.images.map(
                      (img: string | { uri: string }, index: number) => {
                        const uri = typeof img === "string" ? img : img.uri;
                        return (
                          <Image
                            key={index}
                            source={{ uri }}
                            contentFit="cover"
                            style={styles.image}
                          />
                        );
                      }
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>

          <ListingButtons
            handleBack={handleBack}
            handleNext={handleNext}
            nextBtnTitle={loading ? "Listing..." : "Submit"}
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
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
});

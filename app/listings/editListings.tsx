import { CustomListingHeader } from "@/components/ui/customListingHeader";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@/constants/random";
import { useListing } from "@/context/listingContext";
import { useDeleteListing } from "@/hooks/useEditListing";
import { useGetListingById } from "@/hooks/useGetListings";
import { t } from "@/localization/t";
import { isMoreThanDashWords, showToast, themeColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function EditListingsScreen() {
  const { id } = useLocalSearchParams();
  const { data: listing, isLoading } = useGetListingById(id as string);
  const { formData, updateFormData, resetFormData } = useListing();
  const router = useRouter();
  const { mutate: deleteListing } = useDeleteListing();
  const queryClient = useQueryClient();

  const bg = themeColor("background");
  const text = themeColor("text");

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [availableNow, setAvailableNow] = useState(
    formData.availability === "Available Now"
  );
  const [errors, setErrors] = useState({ title: "", description: "" });
  const [images, setImages] = useState(formData.images || []);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [scheduleText, setScheduleText] = useState("");

  const originalData = useMemo(() => {
    if (!listing) return null;

    return {
      title: listing.title,
      description: listing.description,
      location: listing.distance,
      availability: listing.availability,
      images: Array.isArray(listing.image)
        ? listing.image
        : listing.image
        ? [listing.image]
        : [],
    };
  }, [listing]);

  const handleAvailabilityToggle = () => {
    const newValue = !availableNow;
    setAvailableNow(newValue);
    updateFormData("availability", newValue ? "Available Now" : scheduleText);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDateTime(date);
      const formatted = date.toLocaleString();
      setScheduleText(formatted);
      if (!availableNow) updateFormData("availability", formatted);
    }
  };

  const handleLocationChange = (value: string) => {
    updateFormData("location", value);
  };

  const detectLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    const place = await Location.reverseGeocodeAsync(loc.coords);
    const cityString = `${place[0].city}, ${place[0].region}`;
    updateFormData("location", cityString);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      selectionLimit: 3,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selected = result.assets.map((asset) => asset.uri);
      setImages((prev) => {
        const combined = [...prev, ...selected].slice(0, 3);
        updateFormData("images", combined);
        return combined;
      });
    }
  };

  useEffect(() => {
    if (listing) {
      updateFormData("title", listing.title);
      updateFormData("description", listing.description);
      updateFormData("location", listing.distance);
      updateFormData("availability", listing.availability);
      const imgs = Array.isArray(listing.image)
        ? listing.image
        : listing.image
        ? [listing.image]
        : [];
      setImages(imgs);
      updateFormData("images", imgs);
    }
  }, [listing]);

  useEffect(() => {
    if (!originalData) return;

    const requiredFieldsFilled =
      formData.title.trim() !== "" && formData.description.trim() !== "";

    const hasChanges =
      formData.title !== originalData.title ||
      formData.description !== originalData.description ||
      formData.location !== originalData.location ||
      formData.availability !== originalData.availability ||
      JSON.stringify(formData.images) !== JSON.stringify(originalData.images);

    setDisableSubmit(!requiredFieldsFilled || !hasChanges);
  }, [formData, originalData]);

  if (isLoading || !listing) return null;

  const handleBack = () => router.back();

  const handleSubmit = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    const newErrors = {
      title: formData.title ? "" : "Title is required",
      description: formData.description ? "" : "Description is required",
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.description) {
      return;
    }

    try {
      const formDataPayload = new FormData();

      formDataPayload.append("title", formData.title);
      formDataPayload.append("description", formData.description);
      formDataPayload.append("location", formData.location);
      formDataPayload.append("availability", formData.availability);

      // Append new images (if any)
      formData.images?.forEach((uri: string, index: number) => {
        const filename = uri.split("/").pop() || `image-${index}.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formDataPayload.append("images", {
          uri,
          name: filename,
          type,
        } as any); // required for React Native FormData
      });

      const response = await fetch(`${BASE_URL}listings/edit/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataPayload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update listing");
      }

      resetFormData();
      console.log("Listing updated:", data.listingId);
      queryClient.invalidateQueries({
        predicate: (query) =>
          ["favorites", "listings", "listing", "isFavorited"].includes(
            query.queryKey[0] as string
          ),
      });
      router.push("/listings/listingSuccess");
    } catch (err: any) {
      console.error("Edit listing error:", err.message);
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  const handleDelete = () => {
    Alert.alert(t("warnings.titleDel"), t("warnings.descDel"), [
      { text: t("btnTexts.cancel"), style: "cancel" },
      {
        text: t("btnTexts.delete"),
        style: "destructive",
        onPress: () => {
          deleteListing(id as string, {
            onSuccess: () => {
              showToast({
                type: "success",
                text1: t("alerts.del"),
                message: t("alerts.delMsg"),
              });
              resetFormData();
              router.replace("/listings");
            },
            onError: (err: any) => {
              Alert.alert("Error", err.message || "Failed to delete listing");
            },
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <InnerContainer style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator
          contentContainerStyle={{
            paddingBottom: 32,
          }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View style={{ gap: 10 }}>
                <CustomListingHeader
                  heading={t("editListing.header")}
                  subHeading={t("editListing.subHeading")}
                />

                <View>
                  <CustomText style={[styles.label, { color: text }]}>
                    {t("editListing.title")}
                  </CustomText>
                  <TextInput
                    style={styles.input}
                    value={formData.title}
                    onChangeText={(text) => updateFormData("title", text)}
                    onBlur={() => {
                      if (!formData.title) {
                        setErrors((prev) => ({
                          ...prev,
                          title: t("editListing.reqTitle"),
                        }));
                      }
                    }}
                  />
                  {errors.title !== "" && (
                    <CustomText style={styles.error}>{errors.title}</CustomText>
                  )}
                </View>

                <View>
                  <CustomText style={[styles.label, { color: text }]}>
                    {t("editListing.descriptionTitle")}
                  </CustomText>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    multiline
                    numberOfLines={5}
                    value={formData.description}
                    onChangeText={(text) => updateFormData("description", text)}
                    onBlur={() => {
                      if (
                        !isMoreThanDashWords({
                          text: formData.description,
                          wordsNum: 4,
                        })
                      ) {
                        setErrors((prev) => ({
                          ...prev,
                          description: t("editListing.reqDesc"),
                        }));
                      }
                    }}
                  />
                  {errors.description !== "" && (
                    <CustomText style={styles.error}>
                      {errors.description}
                    </CustomText>
                  )}
                </View>

                <View>
                  <CustomText style={[styles.label, { color: text }]}>
                    {t("editListing.imagesTitle")}
                  </CustomText>
                  <View style={styles.imageSlotsContainer}>
                    {[0, 1, 2].map((_, index) => {
                      const image = images[index];
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.imageSlot}
                          onPress={pickImage}
                        >
                          {image ? (
                            <Image
                              source={{ uri: image }}
                              style={styles.imagePreview}
                            />
                          ) : (
                            <Ionicons
                              name="add-outline"
                              size={28}
                              color="#999"
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View style={{ marginVertical: 10 }}>
                  <View style={styles.row}>
                    <CustomText style={{ color: text }}>
                      {t("editListing.available")}
                    </CustomText>
                    <Switch
                      value={availableNow}
                      onValueChange={handleAvailabilityToggle}
                    />
                  </View>

                  {!availableNow && (
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={styles.scheduleButton}
                    >
                      <CustomText>
                        {formData.availability ||
                          t("editListing.selectSchedule")}
                      </CustomText>
                    </TouchableOpacity>
                  )}
                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDateTime || new Date()}
                      mode="datetime"
                      onChange={handleDateChange}
                      style={{ backgroundColor: text }}
                    />
                  )}
                </View>

                <View>
                  <CustomText style={[styles.label, { color: text }]}>
                    {t("userProfile.location")}
                  </CustomText>
                  <TextInput
                    style={styles.input}
                    value={formData.location}
                    onChangeText={handleLocationChange}
                  />
                  <TouchableOpacity onPress={detectLocation}>
                    <CustomText style={styles.locationText}>
                      {t("editListing.currentLoc")}
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginTop: 40, marginBottom: 20 }}>
                <ListingButtons
                  handleBack={handleBack}
                  handleNext={handleSubmit}
                  backBtnTitle={t("btnTexts.cancel")}
                  nextBtnTitle={t("btnTexts.submit")}
                  disabled={disableSubmit}
                />
              </View>

              <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: "red" }]}
                onPress={handleDelete}
              >
                <CustomText style={styles.buttonText}>
                  {t("btnTexts.delete")}
                </CustomText>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    marginBottom: 8,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  scheduleButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    borderColor: Colors.light.textSecondary,
    borderWidth: 1,
    marginBottom: 12,
  },
  locationText: {
    fontFamily: "Satoshi-Bold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    color: Colors.light.primary,
  },
  nextButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});

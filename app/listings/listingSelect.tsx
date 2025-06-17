import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { useListing } from "@/context/listingContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  DimensionValue,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function ListingSelect() {
  const router = useRouter();
  const { formData, updateFormData } = useListing();

  const [availableNow, setAvailableNow] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [scheduleText, setScheduleText] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [location, setLocation] = useState("");

  useEffect(() => {
    const isAvailableNow = formData.availability === "Available Now";
    const scheduleText = formData.availability;
    const loc = formData.location;

    const shouldDisable =
      (!isAvailableNow && scheduleText.trim() === "") ||
      !location ||
      loc.trim() === "";

    setDisabled(shouldDisable);
  }, [formData.availability, formData.location]);

  const progressPercentage: DimensionValue = `${
    (formData.current_step / formData.total_steps) * 100
  }%`;

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

  const detectLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    const place = await Location.reverseGeocodeAsync(loc.coords);
    const cityString = `${place[0].city}`;
    setLocation(cityString);
    updateFormData("location", cityString);
  };

  const handleLocationChange = (text: string) => {
    setLocation(text);
    updateFormData("location", text);
  };

  const handleBack = () => {
    updateFormData("current_step", formData.current_step - 1);
    router.back();
  };

  const handleNext = () => {
    try {
      updateFormData("current_step", formData.current_step + 1);
      router.push("/listings/listingReview");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <CustomProgressBar progressPercentage={progressPercentage} />

              <CustomListingHeader
                heading="When and Where is Your Item Available?"
                subHeading="Let others know when they can borrow it and where to find it. Set a schedule or mark it as available now, and add a pickup location."
              />

              <View style={{ marginBottom: 20 }}>
                <CustomText style={styles.label}>Availability</CustomText>
                <View style={styles.row}>
                  <CustomText style={styles.text}>Available Now</CustomText>
                  <Switch
                    value={availableNow}
                    onValueChange={handleAvailabilityToggle}
                  />
                </View>

                {!availableNow && (
                  <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={styles.scheduleButton}
                    >
                      <CustomText>
                        {scheduleText || "Select Schedule"}
                      </CustomText>
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        mode="datetime"
                        value={selectedDateTime || new Date()}
                        onChange={handleDateChange}
                      />
                    )}
                  </View>
                )}
              </View>

              <View>
                <CustomText style={styles.label}>Location</CustomText>

                <TextInput
                  style={styles.input}
                  placeholder="Enter your city e.g Monterrey, N.L."
                  value={location}
                  onChangeText={handleLocationChange}
                />

                <TouchableOpacity onPress={detectLocation}>
                  <CustomText style={styles.locationText}>
                    Use Current Location
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>

            <ListingButtons
              handleBack={handleBack}
              handleNext={handleNext}
              disabled={disabled}
            />
          </View>
        </TouchableWithoutFeedback>
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
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
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
  input: {
    borderWidth: 1,
    borderColor: Colors.light.textSecondary,
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});

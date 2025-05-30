import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  DimensionValue,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignupBioLocScreen() {
  const router = useRouter();
  const { userData, updateUserForm } = useUserData();
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [errors, setErrors] = useState({ bio: "" });

  useEffect(() => {
    const loc = userData.location;
    const invalidInput =
      bio.trim().length === 0 || loc.trim() === "" || !location;
    setInvalid(invalidInput);
  }, [bio, userData.location]);

  const progressPercentage: DimensionValue = `${
    (userData.current_step / userData.total_steps) * 100
  }%`;

  const detectLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    const place = await Location.reverseGeocodeAsync(loc.coords);
    const cityString = `${place[0].city}, ${place[0].region}`;
    setLocation(cityString);
    updateUserForm("location", cityString);
  };

  const handleLocationChange = (text: string) => {
    setLocation(text);
    updateUserForm("location", text);
  };

  const validateInputs = () => {
    const newErrors = { bio: "", location: "" };
    let isValid = true;

    if (bio.trim().length === 0) {
      newErrors.bio = "Bio can't be empty.";
      isValid = false;
    }

    if (location.trim() === "") {
      newErrors.bio = "Must add location";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBack = () => {
    updateUserForm("current_step", userData.current_step - 1);
    router.back();
  };

  const handleNext = () => {
    if (!validateInputs()) return;

    try {
      updateUserForm("current_step", userData.current_step + 1);
      updateUserForm("bio", bio.trim());
      router.push("/signup/signupReview");
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
              heading="Tell us about yourself"
              subHeading="Tell the community who you are and where you're based. Just enough to connect!"
            />

            {/* Bio Input */}
            <View>
              <CustomText style={styles.label}>Bio</CustomText>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="DIY enthusiast. I love sharing tools and gear…"
                multiline
                maxLength={160}
                value={bio}
                onChangeText={(text) => setBio(text)}
              />
              {errors.bio !== "" && (
                <CustomText style={styles.error}>{errors.bio}</CustomText>
              )}
            </View>

            <View>
              <CustomText style={styles.label}>Location</CustomText>

              <TextInput
                style={styles.input}
                placeholder="Enter your city"
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
            disabled={invalid}
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  locationText: {
    fontFamily: "Satoshi-Bold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    color: Colors.light.primary,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

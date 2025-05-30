import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { useListing } from "@/context/listingContext";
import { isMoreThanDashWords } from "@/utils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  DimensionValue,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function ListingFormsScreen() {
  const router = useRouter();
  const { formData, updateFormData } = useListing();
  const [invalid, setInvalid] = useState(false);
  const [errors, setErrors] = useState({ title: "", description: "" });

  const progressPercentage: DimensionValue = `${
    (formData.current_step / formData.total_steps) * 100
  }%`;

  useEffect(() => {
    const invalidInput = !formData.title || !formData.description;
    setInvalid(invalidInput);
  }, [formData.title, formData.description]);

  const validateInputs = () => {
    const newErrors = { title: "", description: "" };
    let isValid = true;

    if (!isMoreThanDashWords({ text: formData.title, wordsNum: 1 })) {
      newErrors.title = "Title must be more than 2 words";
      isValid = false;
    }

    if (!isMoreThanDashWords({ text: formData.description, wordsNum: 4 })) {
      newErrors.description = "Description must be more than 5";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBack = () => router.back();

  const handleNext = () => {
    if (!validateInputs()) return;

    try {
      console.log(formData.title, formData.description);
      updateFormData("current_step", formData.current_step + 1);
      router.push("/listings/listingImgSelect");
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
                heading="Create Your Listing"
                subHeading="Add a clear title and a compelling description to attract
                interest."
              />

              {/* Title Input */}
              <View style={{ marginBottom: 20 }}>
                <CustomText style={styles.label}>Title</CustomText>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. Camping Tent for 2 People"
                  value={formData.title}
                  onChangeText={(text) => updateFormData("title", text)}
                />
                {errors.title !== "" && (
                  <CustomText style={styles.error}>{errors.title}</CustomText>
                )}
              </View>

              {/* Description Input */}
              <View style={{ marginBottom: 20 }}>
                <CustomText style={styles.label}>Description</CustomText>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Provide details: condition, brand, usage, etc."
                  multiline
                  numberOfLines={5}
                  value={formData.description}
                  onChangeText={(text) => updateFormData("description", text)}
                />
                {errors.description !== "" && (
                  <CustomText style={styles.error}>
                    {errors.description}
                  </CustomText>
                )}
              </View>
            </View>

            <ListingButtons
              handleBack={handleBack}
              handleNext={handleNext}
              disabled={invalid}
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
  error: {
    color: "red",
    marginBottom: 8,
  },
});

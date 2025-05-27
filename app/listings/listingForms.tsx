import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h2 } from "@/constants/random";
import { useListing } from "@/context/listingContext";
import { isMoreThanDashWords } from "@/utils";
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

    if (!isMoreThanDashWords({ text: formData.title, wordsNum: 2 })) {
      newErrors.title = "Title must be more than 2 words";
      isValid = false;
    }

    if (!isMoreThanDashWords({ text: formData.description, wordsNum: 5 })) {
      newErrors.description = "Description must be more than 5";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBack = () => router.back();
  const handleNext = () => {
    if (!validateInputs()) return;

    console.log(formData.title, formData.description);
  };

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <View style={styles.progressBarContainer}>
              <View
                style={[styles.progressFill, { width: progressPercentage }]}
              />
            </View>

            <View style={{ marginVertical: 30, gap: 5 }}>
              <CustomText style={[styles.heading, h2]}>
                Create Your Listing
              </CustomText>
              <CustomText style={styles.subheading}>
                Add a clear title and a compelling description to attract
                interest.
              </CustomText>
            </View>

            {/* Title Input */}
            <View>
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
            <View>
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity onPress={handleBack}>
              <CustomText style={styles.backText}>Back</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={invalid}
              style={[styles.nextButton, invalid && styles.disabledButton]}
              onPress={handleNext}
            >
              <CustomText style={styles.buttonText}>Next</CustomText>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#fff",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#eee",
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.light.primary,
  },
  heading: {
    fontSize: 24,
  },
  subheading: {
    fontSize: 16,
    color: Colors.light.textSecondary,
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
  backText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
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
  disabledButton: {
    backgroundColor: Colors.light.muted,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

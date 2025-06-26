import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { h3 } from "@/constants/random";
import { useListing } from "@/context/listingContext";
import { t } from "@/localization/t";
import { isMoreThanDashWords, themeColor } from "@/utils";
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
  const bg = themeColor("background");
  const text = themeColor("text");
  const [invalid, setInvalid] = useState(false);
  const [errors, setErrors] = useState({ title: "", description: "" });
  const [focusedInput, setFocusedInput] = useState<
    null | "title" | "description"
  >(null);

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

  const titleRules = t("listingForm.titleRules");
  const descRules = t("listingForm.descRules");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <InnerContainer style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <CustomProgressBar progressPercentage={progressPercentage} />

              <CustomListingHeader
                heading={t("listingForm.header")}
                subHeading={t("listingForm.subTitle")}
              />

              {/* Title Input */}
              <View style={{ marginBottom: 20 }}>
                <CustomText style={[styles.label, h3, { color: text }]}>
                  {t("editListing.title")}
                </CustomText>
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === "title" && styles.focusedInput,
                  ]}
                  placeholder="E.g. Camping Tent for 2 People"
                  value={formData.title}
                  onChangeText={(text) => updateFormData("title", text)}
                  selectionColor="#000"
                  onFocus={() => setFocusedInput("title")}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.title !== "" ? (
                  <CustomText style={styles.error}>{errors.title}</CustomText>
                ) : (
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <CustomText style={styles.helperText}>
                      {t("listingForm.titleRuleTitle")}
                    </CustomText>

                    {Array.isArray(titleRules) &&
                      titleRules.map((rule, index) => (
                        <CustomText style={styles.helperText} key={index}>
                          • {rule}
                        </CustomText>
                      ))}
                  </View>
                )}
              </View>

              {/* Description Input */}
              <View style={{ marginBottom: 20 }}>
                <CustomText style={[styles.label, h3, { color: text }]}>
                  {t("listingForm.description")}
                </CustomText>
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === "description" && styles.focusedInput,
                    styles.textArea,
                  ]}
                  placeholder="Provide details: condition, brand, usage, etc."
                  multiline
                  numberOfLines={5}
                  value={formData.description}
                  onChangeText={(text) => updateFormData("description", text)}
                  selectionColor="#000"
                  onFocus={() => setFocusedInput("description")}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.description !== "" ? (
                  <CustomText style={styles.error}>
                    {errors.description}
                  </CustomText>
                ) : (
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <CustomText style={styles.helperText}>
                      {t("listingForm.descRuleTitle")}
                    </CustomText>

                    {Array.isArray(descRules) &&
                      descRules.map((rule, index) => (
                        <CustomText style={styles.helperText} key={index}>
                          • {rule}
                        </CustomText>
                      ))}
                  </View>
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
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
  },
  helperText: {
    color: "#6B7280",
    fontSize: 12,
  },
});

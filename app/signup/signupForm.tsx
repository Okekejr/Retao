import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { t } from "@/localization/t";
import { isMoreThanDashWords } from "@/utils";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
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

export default function SignupFormScreen() {
  const router = useRouter();
  const { userData, updateUserForm, resetUserData } = useUserData();
  const [invalid, setInvalid] = useState(false);
  const [isHandleUnique, setHandleUnique] = useState(true);
  const [errors, setErrors] = useState({ name: "", handle: "" });

  const progressPercentage: DimensionValue = `${
    (userData.current_step / userData.total_steps) * 100
  }%`;

  useEffect(() => {
    const invalidInput = !(userData.name && userData.handle && isHandleUnique);
    setInvalid(invalidInput);
  }, [userData.name, userData.handle, isHandleUnique]);

  const checkHandleExists = async (handle: string) => {
    if (!handle.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}users/checkHandle?handle=${handle}`);
      const data = await res.json();

      if (data.status === "OK") {
        setHandleUnique(!data.exists);
        setErrors((prev) => ({
          ...prev,
          handle: data.exists ? t("signUpForm.errors.handleTaken") : "",
        }));
      } else {
        throw new Error("Failed to validate handle.");
      }
    } catch (error) {
      console.error("Error checking handle uniqueness:", error);
    }
  };

  const validateInputs = () => {
    const newErrors = { name: "", handle: "" };
    let isValid = true;

    // Validate name: must be at least two words
    if (!isMoreThanDashWords({ text: userData.name, wordsNum: 1 })) {
      newErrors.name = t("signUpForm.errors.name");
      isValid = false;
    }

    const handle = userData.handle.trim();
    if (!/^@[a-zA-Z0-9_]+$/.test(handle)) {
      newErrors.handle = t("signUpForm.errors.handleFormat");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBack = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      resetUserData();
      router.replace({ pathname: "/login/login" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    if (!validateInputs()) return;

    try {
      console.log(userData.name, userData.handle);
      updateUserForm("current_step", userData.current_step + 1);
      router.push("/signup/signupAvatar");
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
                heading={t("signUpForm.heading")}
                subHeading={t("signUpForm.subHeading")}
                style={{ color: Colors.light.text }}
              />

              {/* Name Input */}
              <View style={{ marginBottom: 20 }}>
                <CustomText style={styles.label}>
                  {t("userProfile.name")}
                </CustomText>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. John Doe"
                  value={userData.name}
                  onChangeText={(text) => updateUserForm("name", text)}
                />
                {errors.name !== "" && (
                  <CustomText style={styles.error}>{errors.name}</CustomText>
                )}
              </View>

              {/* Handle Input */}
              <View style={{ marginBottom: 20 }}>
                <CustomText style={styles.label}>
                  {t("userProfile.handle")}
                </CustomText>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. @JohnDoe"
                  value={userData.handle}
                  onBlur={() => checkHandleExists(userData.handle)}
                  onChangeText={(text) => updateUserForm("handle", text)}
                />
                {errors.handle !== "" && (
                  <CustomText style={styles.error}>{errors.handle}</CustomText>
                )}
              </View>
            </View>

            <ListingButtons
              handleBack={handleBack}
              handleNext={handleNext}
              disabled={invalid}
              backBtnTitle={t("btnTexts.cancel")}
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
    backgroundColor: "#fafafa",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

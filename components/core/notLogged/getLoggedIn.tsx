import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { AppName, BASE_URL, h2, h3 } from "@/constants/random";
import { useNetwork } from "@/context/networkContext";
import { useUserData } from "@/context/userContext";
import { useGetUserData } from "@/hooks/useGetUserData";
import { t } from "@/localization/t";
import {
  checkEmailExists,
  getNextIncompleteStep,
  isProfileComplete,
  LoginFunc,
  showToast,
  themeColor,
  validateEmail,
} from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import * as AppleAuthentication from "expo-apple-authentication";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { AnimatePresence, MotiView } from "moti";
import { FC, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface GetLoggedInModalProps {
  closeModal: () => void;
  func: (content: string) => void;
}

export const GetLoggedInModal: FC<GetLoggedInModalProps> = ({
  closeModal,
  func,
}) => {
  const router = useRouter();
  const { isConnected } = useNetwork();
  const { refreshData } = useGetUserData();
  const { updateUserForm } = useUserData();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExist, setEmailExist] = useState(true);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<null | "email" | "password">(
    null
  );
  const { userData } = useUserData();
  const [isChecking, setIsChecking] = useState(false);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    login: "",
  });
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const text = themeColor("text");
  const textTertiery = themeColor("textTertiery");

  useEffect(() => {
    // Enable button only if both fields are filled
    setButtonDisabled(!(email && password && emailExist));
  }, [email, password, emailExist]);

  const validateInputs = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      login: "",
    };
    let isValid = true;

    if (!email) {
      newErrors.email = t("login.errors.email");
      isValid = false;
    }
    if (!password) {
      newErrors.password = t("login.errors.password");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if ((!validateInputs() && !email) || !password) return;
    if (!validateEmail(email)) return;

    if (!isConnected) {
      setErrors((prev) => ({
        ...prev,
        login: "No internet connection",
      }));
      return;
    }

    const { success, error } = await LoginFunc(email, password);

    if (!success) {
      setErrors((prev) => ({
        ...prev,
        login: error,
      }));
      return;
    }

    try {
      setIsChecking(true);
      await refreshData();
      closeModal();
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (isChecking && userData?.email) {
      if (isProfileComplete(userData)) {
        closeModal();
      } else {
        const nextRoute = getNextIncompleteStep(userData.current_step || 0);
        router.replace(nextRoute);
      }
      setIsChecking(false); // ✅ always reset after handling
    }
  }, [userData?.email, isChecking]); // ensure this runs only when needed

  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={[h3, { color: text }]}>
          {t("profile.notLoggedIn.btnText")}
        </CustomText>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ justifyContent: "center", paddingBottom: 50 }}>
          <AnimatePresence exitBeforeEnter>
            {step === 1 && (
              <MotiView
                key="step1"
                from={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ type: "timing", duration: 300 }}
              >
                {/* Step 1 – Email input */}
                <CustomText style={[styles.label, { color: text }]}>
                  {t("userProfile.email")}
                </CustomText>
                <TextInput
                  ref={emailInputRef}
                  style={[
                    styles.input,
                    focusedInput === "email" && styles.focusedInput,
                    errors.email && styles.errorInput,
                  ]}
                  placeholder={t("userProfile.email")}
                  placeholderTextColor="#c7c7c7"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  selectionColor="#000"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(text) => setEmail(text.trim())}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={async () => {
                    setFocusedInput(null);
                    await checkEmailExists(email, {
                      login: true,
                      setEmailUnique: setEmailExist,
                      setErrors,
                    });
                  }}
                />
                {errors.email && (
                  <CustomText style={styles.error}>{errors.email}</CustomText>
                )}

                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    (!email || !emailExist) && styles.disabledButton,
                    { marginVertical: 30 },
                  ]}
                  disabled={!email || !emailExist}
                  onPress={async () => {
                    const exists = await checkEmailExists(email, {
                      login: true,
                      setEmailUnique: setEmailExist,
                      setErrors,
                    });
                    if (exists) {
                      setStep(2);
                    }
                  }}
                >
                  <CustomText style={styles.buttonText}>
                    {t("btnTexts.continue")}
                  </CustomText>
                </TouchableOpacity>
              </MotiView>
            )}

            {step === 2 && (
              <MotiView
                key="step2"
                from={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ type: "timing", duration: 300 }}
              >
                {/* Back Button */}
                <TouchableOpacity
                  onPress={() => setStep(1)}
                  style={{ marginBottom: 12, alignSelf: "flex-start" }}
                >
                  <CustomText style={{ color: textTertiery }}>
                    <Ionicons
                      name="arrow-back-outline"
                      size={24}
                      color={text}
                    />
                  </CustomText>
                </TouchableOpacity>

                {/* Image + Heading */}
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                  <Image
                    source={require("../../../assets/images/icon.png")}
                    style={{ width: 100, height: 100, marginBottom: 30 }}
                  />
                  <CustomText
                    style={[h2, { textAlign: "center", color: text }]}
                  >
                    {t("introScreen.welcomeHeading", { appName: AppName })}
                  </CustomText>
                </View>

                {/* Password Field */}
                <CustomText style={[styles.label, { color: text }]}>
                  {t("loginsecurity.passwordTitle")}
                </CustomText>
                <View
                  style={[
                    styles.passwordInputContainer,
                    focusedInput === "password" && styles.focusedInput,
                  ]}
                >
                  <TextInput
                    ref={passwordInputRef}
                    style={styles.passwordInput}
                    placeholder={t("loginsecurity.passwordTitle")}
                    placeholderTextColor="#c7c7c7"
                    selectionColor="#000"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    onSubmitEditing={handleLogin}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                  >
                    <CustomText style={styles.btnText}>
                      {!isPasswordVisible ? "Show" : "Hide"}
                    </CustomText>
                  </TouchableOpacity>
                </View>
                {errors.login && (
                  <CustomText style={styles.error}>{errors.login}</CustomText>
                )}

                {/* Login Button */}
                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    isButtonDisabled && styles.disabledButton,
                    { marginVertical: 30 },
                  ]}
                  disabled={isButtonDisabled}
                  onPress={handleLogin}
                >
                  <CustomText style={styles.buttonText}>
                    {t("login.button")}
                  </CustomText>
                </TouchableOpacity>
              </MotiView>
            )}
          </AnimatePresence>

          <CustomDivider text="OR" />

          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={12}
            style={{
              width: "100%",
              height: 53,
              marginVertical: 20,
            }}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  ],
                });

                console.log("Apple credential:", credential);

                const fullName = `${credential.fullName?.givenName ?? ""} ${
                  credential.fullName?.familyName ?? ""
                }`.trim();

                if (!credential.identityToken) {
                  alert("Apple login failed: No token received");
                  return;
                }

                const res = await fetch(`${BASE_URL}users/auth/apple`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    identityToken: credential.identityToken,
                    fullName,
                  }),
                });

                if (!res.ok) {
                  const text = await res.text(); // fallback error body
                  console.error("Raw backend response:", text);
                  alert("Login failed.");
                  return;
                }

                const data = await res.json();

                await SecureStore.setItemAsync("token", data.token);
                await SecureStore.setItemAsync("id", data.userId);
                await refreshData(); // reuse your existing logic

                if (data.isNew) {
                  updateUserForm("id", data.userId);
                  updateUserForm("email", credential.email ?? "");
                  updateUserForm("name", data.name);
                  updateUserForm("handle", data.handle);
                  router.replace("/signup/signupAvatar"); // Start onboarding flow
                } else {
                  closeModal();
                }
              } catch (error: any) {
                if (error.code === "ERR_CANCELED") {
                  console.log("Apple login canceled");
                } else {
                  console.error("Apple login failed", error);
                  showToast({
                    type: "error",
                    text1: "Apple login failed",
                    message: "Apple login failed",
                  });
                }
              }
            }}
          />

          {/* Go to Signup */}
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: textTertiery }]}
            onPress={() => func("Signup")}
          >
            <CustomText style={styles.buttonText}>
              {t("login.signupPrompt")}
            </CustomText>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 24,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.textSecondary,
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    height: 45.5,
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.light.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 45.5,
    backgroundColor: "#fafafa",
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    color: "#000",
    height: 45.5,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  errorInput: {
    borderColor: "red",
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
  btnText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
});

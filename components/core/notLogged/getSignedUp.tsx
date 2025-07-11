import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { BASE_URL, h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { useGetUserData } from "@/hooks/useGetUserData";
import { t } from "@/localization/t";
import {
  checkEmailExists,
  showToast,
  themeColor,
  validateEmail,
  validatePassword,
} from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import * as AppleAuthentication from "expo-apple-authentication";
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

interface GetSiggnedUpModalProps {
  closeModal: () => void;
  func: (content: string) => void;
}

export const GetSiggnedUp: FC<GetSiggnedUpModalProps> = ({
  closeModal,
  func,
}) => {
  const { updateUserForm } = useUserData();
  const { refreshData } = useGetUserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<
    null | "email" | "password" | "confirmPassword"
  >(null);

  const router = useRouter();
  const emailInputRef = useRef<TextInput>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [isEmailUnique, setEmailUnique] = useState(true);
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
    const passwordsMatch =
      password && confirmPassword && password === confirmPassword;
    setButtonDisabled(!(email && passwordsMatch && isEmailUnique));
  }, [email, password, confirmPassword, isEmailUnique]);

  const handleSignup = async () => {
    const emailError = validateEmail(email)
      ? ""
      : t("signUp.errors.invalidEmail");

    const passwordError = validatePassword(password)
      ? ""
      : t("signUp.errors.invalidPassword");

    const confirmError =
      password === confirmPassword
        ? ""
        : t("signUp.errors.passwordsDoNotMatch");

    if (emailError || passwordError || confirmError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmError,
        login: "",
      });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      await SecureStore.setItemAsync("token", data.token);
      await SecureStore.setItemAsync("id", data.token);
      await SecureStore.setItemAsync("email", data.token);

      updateUserForm("id", data.user.id);
      updateUserForm("email", data.user.email);

      closeModal();
      router.replace("/signup/intro");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const rules = t("helperText.rules");

  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={[h3, { color: text }]}>
          {t("profile.notLoggedIn.signup")}
        </CustomText>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ justifyContent: "center", paddingBottom: 45 }}>
          <AnimatePresence exitBeforeEnter>
            {step === 1 && (
              <MotiView
                key="step1"
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ type: "timing", duration: 300 }}
              >
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
                  selectionColor="#000"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={async () => {
                    setFocusedInput(null);
                    await checkEmailExists(email, {
                      login: false,
                      setEmailUnique,
                      setErrors,
                    });
                  }}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailUnique(false); // reset check if email changes
                  }}
                />

                {errors.email && (
                  <CustomText style={styles.error}>{errors.email}</CustomText>
                )}

                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    (!email || !isEmailUnique) && styles.disabledButton,
                    { marginVertical: 30 },
                  ]}
                  disabled={!email || !isEmailUnique}
                  onPress={() => setStep(2)}
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
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ type: "timing", duration: 300 }}
              >
                {/* Back Button */}
                <TouchableOpacity
                  onPress={() => setStep(1)}
                  style={{ marginBottom: 20, alignSelf: "flex-start" }}
                >
                  <CustomText style={{ color: textTertiery, width: "auto" }}>
                    <Ionicons
                      name="arrow-back-outline"
                      size={24}
                      color={text}
                    />
                  </CustomText>
                </TouchableOpacity>

                {/* Password */}
                <CustomText style={[styles.label, { color: text }]}>
                  {t("loginsecurity.passwordTitle")}
                </CustomText>
                <TextInput
                  ref={passwordInputRef}
                  style={[
                    styles.input,
                    focusedInput === "password" && styles.focusedInput,
                  ]}
                  placeholder={t("loginsecurity.passwordTitle")}
                  placeholderTextColor="#c7c7c7"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                />

                {/* Confirm Password */}
                <CustomText
                  style={[styles.label, { color: text, marginTop: 16 }]}
                >
                  {t("signUp.confirmPass")}
                </CustomText>
                <View
                  style={[
                    styles.passwordInputContainer,
                    focusedInput === "confirmPassword" && styles.focusedInput,
                  ]}
                >
                  <TextInput
                    ref={confirmPasswordRef}
                    style={styles.passwordInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#c7c7c7"
                    secureTextEntry={!isPasswordVisible}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setFocusedInput("confirmPassword")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                  >
                    <CustomText style={styles.btnText}>
                      {isPasswordVisible ? "Hide" : "Show"}
                    </CustomText>
                  </TouchableOpacity>
                </View>

                {/* Error or rules */}
                {errors.password ? (
                  <CustomText style={styles.error}>
                    {errors.password}
                  </CustomText>
                ) : (
                  <View style={{ marginTop: 8 }}>
                    <CustomText style={styles.helperText}>
                      {t("helperText.heading")}
                    </CustomText>

                    {Array.isArray(rules) &&
                      rules.map((rule, index) => (
                        <CustomText style={styles.helperText} key={index}>
                          • {rule}
                        </CustomText>
                      ))}
                  </View>
                )}

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    isButtonDisabled && styles.disabledButton,
                    { marginVertical: 30 },
                  ]}
                  disabled={isButtonDisabled}
                  onPress={handleSignup}
                >
                  <CustomText style={styles.buttonText}>
                    {t("signUp.button")}
                  </CustomText>
                </TouchableOpacity>
              </MotiView>
            )}
          </AnimatePresence>

          <CustomDivider text="OR" />

          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
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

          {/* Switch to Login */}
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: textTertiery }]}
            onPress={() => func("Login")}
          >
            <CustomText style={styles.buttonText}>
              {t("signUp.loginPrompt")}
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
    height: 45.5,
    backgroundColor: "#fafafa",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.light.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 45.5,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
  },
  passwordInput: {
    flex: 1,
    color: "#000",
    height: 45.5,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  errorInput: {
    borderColor: "red",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  helperText: {
    color: "#6B7280",
    marginTop: 5,
    fontSize: 12,
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
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
  },
});

import { CustomDivider } from "@/components/ui/customDivider";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { BASE_URL, h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { t } from "@/localization/t";
import {
  checkEmailExists,
  themeColor,
  validateEmail,
  validatePassword,
} from "@/utils";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<
    null | "email" | "password" | "confirmPassword"
  >(null);

  const router = useRouter();
  const emailInputRef = useRef<TextInput>(null);
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
        <View style={{ justifyContent: "center", paddingBottom: 38 }}>
          <View style={{ marginBottom: 20 }}>
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
              placeholder="Email Address"
              placeholderTextColor="#c7c7c7"
              selectionColor="#000"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => {
                setFocusedInput(null),
                  checkEmailExists({
                    email: email,
                    setEmailUnique: setEmailUnique,
                    setErrors: setErrors,
                    login: false,
                  });
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            {errors.email ? (
              <CustomText style={styles.error}>{errors.email}</CustomText>
            ) : null}
          </View>

          <View style={{ marginBottom: 20 }}>
            <CustomText style={[styles.label, { color: text }]}>
              {t("loginsecurity.passwordTitle")}
            </CustomText>
            <TextInput
              ref={passwordInputRef}
              style={[
                styles.input,
                focusedInput === "password" && styles.focusedInput,
              ]}
              placeholder="Password"
              placeholderTextColor="#c7c7c7"
              selectionColor="#000"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
              onFocus={() => setFocusedInput("password")}
              onSubmitEditing={handleSignup}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <CustomText style={[styles.label, { color: text }]}>
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
                selectionColor="#000"
                secureTextEntry={!isPasswordVisible}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                onFocus={() => setFocusedInput("confirmPassword")}
                onSubmitEditing={handleSignup}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                <CustomText style={styles.btnText}>
                  {!isPasswordVisible ? "Show" : "Hide"}
                </CustomText>
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <CustomText style={styles.error}>{errors.password}</CustomText>
            ) : (
              <View style={{ display: "flex", flexDirection: "column" }}>
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
          </View>

          {/* sign in Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              isButtonDisabled && styles.disabledButton,
            ]}
            disabled={isButtonDisabled}
            onPress={handleSignup}
          >
            <CustomText style={styles.buttonText}>
              {t("signUp.button")}
            </CustomText>
          </TouchableOpacity>

          <CustomDivider text="OR" />

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

import { CustomDivider } from "@/components/ui/customDivider";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { checkEmailExists, validateEmail, validatePassword } from "@/utils";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SignupScreen() {
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

  useEffect(() => {
    const passwordsMatch =
      password && confirmPassword && password === confirmPassword;
    setButtonDisabled(!(email && passwordsMatch && isEmailUnique));
  }, [email, password, confirmPassword, isEmailUnique]);

  const handleSignup = async () => {
    const emailError = validateEmail(email) ? "" : "Invalid email format.";
    const passwordError = validatePassword(password)
      ? ""
      : "Password must be at least 6 characters long, include uppercase, lowercase, a number, and a special character.";
    const confirmError =
      password === confirmPassword ? "" : "Passwords do not match.";

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

      router.replace("/signup/intro");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <CustomHeading style={{ marginBottom: 20 }}>
              Create an account
            </CustomHeading>

            <View style={{ marginBottom: 20 }}>
              <CustomText style={styles.label}>Email</CustomText>
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
              <CustomText style={styles.label}>Password</CustomText>
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
              <CustomText style={styles.label}>Confirm Password</CustomText>
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
                <CustomText style={styles.helperText}>
                  Password must include:
                  {"\n"}- At least 6 characters
                  {"\n"}- Uppercase and lowercase letters
                  {"\n"}- A number and a special character
                </CustomText>
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
              <CustomText style={styles.buttonText}>Sign Up</CustomText>
            </TouchableOpacity>

            <CustomDivider text="OR" />

            <TouchableOpacity
              style={[styles.nextButton, styles.otherButton]}
              onPress={() => router.push("/login/login")}
            >
              <CustomText style={styles.buttonText}>
                Have an account? Log in
              </CustomText>
            </TouchableOpacity>
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
    justifyContent: "center",
    backgroundColor: Colors.light.background,
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
  otherButton: {
    backgroundColor: Colors.light.textTertiery,
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

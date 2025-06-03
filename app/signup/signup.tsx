import { CustomDivider } from "@/components/ui/customDivider";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { checkEmailExists, validateEmail, validatePassword } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
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
                style={[styles.input, errors.email ? styles.errorInput : null]}
                placeholder="Email Address"
                placeholderTextColor="#c7c7c7"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={() =>
                  checkEmailExists({
                    email: email,
                    setEmailUnique: setEmailUnique,
                    setErrors: setErrors,
                    login: false,
                  })
                }
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
              <View style={styles.passwordInputContainer}>
                <TextInput
                  ref={passwordInputRef}
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#c7c7c7"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onSubmitEditing={handleSignup}
                />
                {/* Eye icon inside input */}
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 20 }}>
              <CustomText style={styles.label}>Confirm Password</CustomText>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  ref={confirmPasswordRef}
                  style={styles.passwordInput}
                  placeholder="Confirm Password"
                  placeholderTextColor="#c7c7c7"
                  secureTextEntry={!isPasswordVisible}
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  onSubmitEditing={handleSignup}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                    style={styles.eyeIcon}
                  />
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
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.light.textSecondary,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    color: "#000",
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
});

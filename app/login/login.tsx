import { CustomDivider } from "@/components/ui/customDivider";
import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { AppName } from "@/constants/random";
import { useGetUserData } from "@/hooks/useGetUserData";
import { checkEmailExists, LoginFunc, validateEmail } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function LoginScreen() {
  const router = useRouter();
  const { refreshData } = useGetUserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExist, setEmailExist] = useState(true);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    login: "",
  });
  const [isButtonDisabled, setButtonDisabled] = useState(true);

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
      newErrors.email = "Please provide your email.";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Please provide your password.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if ((!validateInputs() && !email) || !password) return;
    if (!validateEmail(email)) return;

    const { success, error } = await LoginFunc(email, password);

    console.log(success, error, email);

    if (!success) {
      setErrors((prev) => ({
        ...prev,
        login: error,
      }));
      return;
    }

    try {
      await refreshData();
      router.replace("/home");
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ marginBottom: 25, gap: 8 }}>
              <CustomHeading>Log in to {AppName}</CustomHeading>
              <CustomText style={styles.subheading}>
                Tools and services, shared by the community.
              </CustomText>
            </View>

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
                value={email}
                onChangeText={(text) => setEmail(text.trim())}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                onBlur={() =>
                  checkEmailExists({
                    email: email,
                    setEmailUnique: setEmailExist,
                    setErrors: setErrors,
                    login: true,
                  })
                }
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
                  onSubmitEditing={handleLogin}
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
              {errors.login ? (
                <CustomText style={styles.error}>{errors.login}</CustomText>
              ) : null}
            </View>

            {/* Log in Button */}
            <TouchableOpacity
              style={[
                styles.nextButton,
                isButtonDisabled && styles.disabledButton,
              ]}
              disabled={isButtonDisabled}
              onPress={handleLogin}
            >
              <CustomText style={styles.buttonText}>Log in</CustomText>
            </TouchableOpacity>

            <CustomDivider text="OR" />

            <TouchableOpacity
              style={[styles.nextButton, styles.otherButton]}
              onPress={() => router.push("/signup/signup")}
            >
              <CustomText style={styles.buttonText}>
                Dont have an account? Sign up
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
  subheading: {
    fontSize: 16,
    color: Colors.light.textTertiery,
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

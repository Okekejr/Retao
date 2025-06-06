import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface UpdatePasswordCompProps {
  passwordInputRef: React.RefObject<TextInput | null>;
  newPasswordInputRef: React.RefObject<TextInput | null>;
  newConfirmPasswordInputRef: React.RefObject<TextInput | null>;
  isPasswordVisible: boolean;
  setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setNewConfirmNewPassword: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: () => Promise<void>;
  setFocusedInput: React.Dispatch<
    React.SetStateAction<"password" | "newPassword" | "confirmPassword" | null>
  >;
  focusedInput: "password" | "newPassword" | "confirmPassword" | null;
  newConfirmNewPassword: string;
  password: string;
  newPassword: string;
  isdisabled: boolean;
  updateError: string | null;
  success: boolean;
  errors: {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
  };
}

export const UpdatePasswordComp = ({
  passwordInputRef,
  newPasswordInputRef,
  newConfirmPasswordInputRef,
  isPasswordVisible,
  success,
  isdisabled,
  updateError,
  newConfirmNewPassword,
  focusedInput,
  newPassword,
  password,
  errors,
  setPasswordVisible,
  setPassword,
  setNewPassword,
  setNewConfirmNewPassword,
  handleUpdate,
  setFocusedInput,
}: UpdatePasswordCompProps) => {
  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <CustomText style={styles.label}>Current password</CustomText>
        <TextInput
          ref={passwordInputRef}
          style={[
            styles.input,
            focusedInput === "password" && styles.focusedInput,
            errors.password && styles.errorInput,
          ]}
          secureTextEntry={true}
          autoCapitalize="none"
          selectionColor="#000"
          autoCorrect={false}
          value={password}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput(null)}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        {errors.password ? (
          <CustomText style={styles.error}>{errors.password}</CustomText>
        ) : null}
      </View>

      <View style={{ marginBottom: 20 }}>
        <CustomText style={styles.label}>New password</CustomText>

        <TextInput
          ref={newPasswordInputRef}
          style={[
            styles.input,
            focusedInput === "newPassword" && styles.focusedInput,
          ]}
          selectionColor="#000"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!isPasswordVisible}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          onFocus={() => setFocusedInput("newPassword")}
          onBlur={() => setFocusedInput(null)}
          onSubmitEditing={() => newConfirmPasswordInputRef.current?.focus()}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <CustomText style={styles.label}>Confirm New Password</CustomText>
        <View
          style={[
            styles.passwordInputContainer,
            focusedInput === "confirmPassword" && styles.focusedInput,
          ]}
        >
          <TextInput
            ref={newConfirmPasswordInputRef}
            style={styles.passwordInput}
            secureTextEntry={!isPasswordVisible}
            value={newConfirmNewPassword}
            selectionColor="#000"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setNewConfirmNewPassword(text)}
            onFocus={() => setFocusedInput("confirmPassword")}
            onBlur={() => setFocusedInput(null)}
            onSubmitEditing={handleUpdate}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <CustomText style={styles.btnText}>
              {!isPasswordVisible ? "Show" : "Hide"}
            </CustomText>
          </TouchableOpacity>
        </View>
        {errors.confirmNewPassword ? (
          <CustomText style={styles.error}>
            {errors.confirmNewPassword}
          </CustomText>
        ) : (
          <CustomText style={styles.helperText}>
            Password must include:
            {"\n"}- At least 6 characters
            {"\n"}- Uppercase and lowercase letters
            {"\n"}- A number and a special character
          </CustomText>
        )}
      </View>

      <TouchableOpacity
        style={[styles.nextButton, isdisabled && styles.disabledButton]}
        disabled={isdisabled}
        onPress={handleUpdate}
      >
        <CustomText style={styles.buttonText}>Update Password</CustomText>
      </TouchableOpacity>

      {updateError ? (
        <CustomText style={[styles.error, { marginTop: 10 }]}>
          {updateError}
        </CustomText>
      ) : null}

      {success ? (
        <CustomText style={[styles.success, { marginTop: 10 }]}>
          Password updated successfully!
        </CustomText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
  success: {
    color: Colors.light.success,
    fontSize: 14,
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

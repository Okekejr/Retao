import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
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
  newPassword,
  password,
  errors,
  setPasswordVisible,
  setPassword,
  setNewPassword,
  setNewConfirmNewPassword,
  handleUpdate,
}: UpdatePasswordCompProps) => {
  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <CustomText style={styles.label}>Current password</CustomText>
        <TextInput
          ref={passwordInputRef}
          style={[styles.input, errors.password ? styles.errorInput : null]}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        {errors.password ? (
          <CustomText style={styles.error}>{errors.password}</CustomText>
        ) : null}
      </View>

      <View style={{ marginBottom: 20 }}>
        <CustomText style={styles.label}>New password</CustomText>
        <View style={styles.passwordInputContainer}>
          <TextInput
            ref={newPasswordInputRef}
            style={styles.passwordInput}
            secureTextEntry={!isPasswordVisible}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            onSubmitEditing={() => newConfirmPasswordInputRef.current?.focus()}
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
        <CustomText style={styles.label}>Confirm New Password</CustomText>
        <View style={styles.passwordInputContainer}>
          <TextInput
            ref={newConfirmPasswordInputRef}
            style={styles.passwordInput}
            secureTextEntry={!isPasswordVisible}
            value={newConfirmNewPassword}
            onChangeText={(text) => setNewConfirmNewPassword(text)}
            onSubmitEditing={handleUpdate}
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
});

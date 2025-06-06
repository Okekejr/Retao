import { UpdatePasswordComp } from "@/components/core/settings/updatePassword";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { SettingsItem } from "@/components/ui/settingItem";
import { Colors } from "@/constants/Colors";
import { h2 } from "@/constants/random";
import { useDeactivateAccount } from "@/hooks/useDeleteAccount";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { validatePassword } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";

export default function LoginSecurityScreen() {
  const { deactivate, loading } = useDeactivateAccount();
  const { updatePassword, error: updateError, success } = useUpdatePassword();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmNewPassword, setNewConfirmNewPassword] = useState("");
  const [showChange, setShowChange] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isdisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [focusedInput, setFocusedInput] = useState<
    null | "password" | "newPassword" | "confirmPassword"
  >(null);
  const passwordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const newConfirmPasswordInputRef = useRef<TextInput>(null);

  const showPasswords = () => setShowChange((prev) => !prev);

  useEffect(() => {
    const newPasswordsMatch =
      newPassword &&
      newConfirmNewPassword &&
      newPassword === newConfirmNewPassword;

    const newIsDifferentFromOld =
      password && newPassword && password !== newPassword;

    const shouldEnable = password && newPasswordsMatch && newIsDifferentFromOld;

    setIsDisabled(!shouldEnable);
  }, [password, newPassword, newConfirmNewPassword]);

  useEffect(() => {
    if (success) {
      setPassword("");
      setNewPassword("");
      setNewConfirmNewPassword("");
      setErrors({ password: "", newPassword: "", confirmNewPassword: "" });
    }
  }, [success]);

  const handleUpdate = async () => {
    const errorsTemp = {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!password) {
      errorsTemp.password = "Current password is required";
    }

    if (!validatePassword(newPassword)) {
      errorsTemp.newPassword =
        "Password must be at least 6 characters, include uppercase, lowercase, a number and a special character";
    }

    if (newPassword !== newConfirmNewPassword) {
      errorsTemp.confirmNewPassword = "Passwords do not match";
    }

    setErrors(errorsTemp);

    const hasErrors = Object.values(errorsTemp).some((e) => e !== "");
    if (hasErrors) return;

    await updatePassword(password, newPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconRow}>
        <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      </View>

      <InnerContainer style={{ flex: 1, gap: 32 }}>
        <View style={styles.modalHeader}>
          <CustomText style={h2}>Login & Security</CustomText>
        </View>

        <View style={{ gap: 40 }}>
          <SettingsItem
            header="Password"
            subHeader="Change your password"
            btnText="Update"
            show={showChange}
            func={showPasswords}
          />

          {showChange && (
            <UpdatePasswordComp
              passwordInputRef={passwordInputRef}
              newPasswordInputRef={newPasswordInputRef}
              newConfirmPasswordInputRef={newConfirmPasswordInputRef}
              isPasswordVisible={isPasswordVisible}
              setPasswordVisible={setPasswordVisible}
              setPassword={setPassword}
              setNewPassword={setNewPassword}
              setNewConfirmNewPassword={setNewConfirmNewPassword}
              handleUpdate={handleUpdate}
              setFocusedInput={setFocusedInput}
              focusedInput={focusedInput}
              newConfirmNewPassword={newConfirmNewPassword}
              password={password}
              newPassword={newPassword}
              isdisabled={isdisabled}
              updateError={updateError}
              success={success}
              errors={errors}
            />
          )}

          <SettingsItem
            header="Deactivate your account"
            subHeader="This cannot be undone"
            btnText={loading ? "Deactivating..." : "Deactivate"}
            func={deactivate}
          />
        </View>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
    gap: 28,
  },
  iconRow: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  modalHeader: {
    marginBottom: 20,
  },
});

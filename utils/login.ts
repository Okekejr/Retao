import { BASE_URL } from "@/constants/random";
import * as SecureStore from "expo-secure-store";
import { showToast } from "./showToast";
import { validateEmail } from "./validate";

export const LoginFunc = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Login failed");

    // Save token securely
    await SecureStore.setItemAsync("token", data.token);

    return { success: true };
  } catch (error: any) {
    console.error("Login error:", error.message);
    showToast({
      type: "error",
      text1: "Login Error",
      message: `${error.message}`,
    });
    return { success: false, error: error.message };
  }
};

interface CheckEmailProps {
  email: string;
  setEmailUnique: (value: React.SetStateAction<boolean>) => void;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      confirmPassword: string;
      login: string;
    }>
  >;
  login?: boolean;
}

export const checkEmailExists = async (
  email: string,
  options: {
    login?: boolean;
    setEmailUnique?: (val: boolean) => void;
    setErrors?: (val: (prev: any) => any) => void;
  } = {} // default value makes it never undefined
): Promise<boolean> => {
  if (!validateEmail(email)) return false;

  try {
    const res = await fetch(`${BASE_URL}users/checkEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.status !== "OK") {
      throw new Error("Failed to validate email.");
    }

    const { exists } = data;

    if (options.login) {
      options.setEmailUnique?.(exists);
      options.setErrors?.((prev) => ({
        ...prev,
        email: exists ? "" : "This email is not registered.",
      }));
    } else {
      options.setEmailUnique?.(!exists);
      options.setErrors?.((prev) => ({
        ...prev,
        email: exists ? "This email is already registered." : "",
      }));
    }

    return options.login ? exists : !exists;
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    return false;
  }
};

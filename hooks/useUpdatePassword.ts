import { BASE_URL } from "@/constants/random";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

export const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) throw new Error("Authentication token not found");

      const response = await fetch(`${BASE_URL}users/updatePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Password update failed");
      }

      setSuccess(true);
      return data;
    } catch (err: any) {
      console.error("Password update error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    updatePassword,
    loading,
    error,
    success,
  };
};

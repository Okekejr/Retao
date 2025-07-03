import { Colors } from "@/constants/Colors";
import { useNetwork } from "@/context/networkContext";
import { useUserData } from "@/context/userContext";
import { useGetUserData } from "@/hooks/useGetUserData";
import { getNextIncompleteStep, isProfileComplete, showToast } from "@/utils";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

const ANIMATION_DURATION = 1200;

export default function IndexScreen() {
  const router = useRouter();
  const { isConnected } = useNetwork();
  const { refreshData } = useGetUserData();
  const { userData, updateUserForm } = useUserData();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isConnected) {
      showToast({
        type: "error",
        text1: "You're offline",
        message: "Please check your internet connection.",
      });
    }
  }, [isConnected]);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // logo delay

      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        updateUserForm("isLoggedIn", false); // 👈 set guest
        router.replace("/home"); // let them explore freely
        return;
      }

      try {
        await refreshData();
        updateUserForm("isLoggedIn", true);
        setIsChecking(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        await SecureStore.deleteItemAsync("token");
        router.replace("/home");
      }
    };

    checkAuth();
  }, []);

  // 🔁 Second effect: run when userData updates after refreshData
  useEffect(() => {
    if (isChecking) return; // wait until refreshData is done

    if (userData?.email) {
      if (isProfileComplete(userData)) {
        router.replace("/home");
      } else {
        const nextRoute = getNextIncompleteStep(userData.current_step || 0);
        router.replace(nextRoute);
      }
    }
  }, [userData, isChecking]);

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        easing="ease-out"
        style={styles.orb}
      />

      <Animatable.Image
        animation="fadeInDown"
        duration={ANIMATION_DURATION}
        style={styles.logo}
        source={require("../assets/images/icon.png")}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  orb: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#000",
    opacity: 0.6,
  },
  logo: {
    width: 120,
    height: 120,
  },
});

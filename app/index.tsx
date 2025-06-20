import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useGetUserData } from "@/hooks/useGetUserData";
import { getNextIncompleteStep, isProfileComplete } from "@/utils";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

const ANIMATION_DURATION = 1200;

export default function IndexScreen() {
  const router = useRouter();
  const { refreshData } = useGetUserData();
  const { userData } = useUserData();

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for logo animation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const token = await SecureStore.getItemAsync("token");

      if (!token) {
        router.replace("/login/login");
        return;
      }

      try {
        await refreshData();

        if (!isProfileComplete(userData)) {
          const nextRoute = getNextIncompleteStep(userData.current_step || 0);
          router.replace(nextRoute);
        } else {
          router.replace("/home");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        await SecureStore.deleteItemAsync("token");
        router.replace("/login/login");
      }
    };

    checkAuth();
  }, []);

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

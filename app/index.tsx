import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@/constants/random";
import { userProfile, useUserData } from "@/context/userContext";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

const ANIMATION_DURATION = 1200;

export default function IndexScreen() {
  const router = useRouter();
  const { updateUserForm } = useUserData();

  useEffect(() => {
    const checkAuth = async () => {
      // ⏳ Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const token = await SecureStore.getItemAsync("token");

      if (!token) {
        router.replace("/login/login");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          const fields: (keyof userProfile)[] = [
            "avatar",
            "email",
            "bio",
            "handle",
            "id",
            "location",
            "join_date",
            "name",
          ];
          fields.forEach((key) => updateUserForm(key, data[key]));
          // Token is valid, navigate to home
          router.replace("/home");
        } else {
          // Token is invalid or expired
          await SecureStore.deleteItemAsync("token");
          router.replace("/login/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
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

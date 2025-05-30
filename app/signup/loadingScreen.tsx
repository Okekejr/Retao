import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { MotiText } from "moti";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

const messages = [
  "Saving your information...",
  "Adding final details...",
  "Loading your experience...",
];

export default function LoadingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Cycle messages
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    const successTimeout = setTimeout(() => {
      setShowSuccess(true);
    }, 5000);

    const navigateTimeout = setTimeout(() => {
      router.replace("/home");
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(successTimeout);
      clearTimeout(navigateTimeout);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Animatable.View animation="bounceIn" delay={500}>
          {showSuccess ? (
            <LottieView
              source={require("../../assets/success-check.json")}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          ) : (
            <LottieView
              source={require("../../assets/loading.json")}
              autoPlay
              loop
              style={styles.lottie}
            />
          )}
        </Animatable.View>

        {!showSuccess && (
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentIndex}
            style={styles.text}
          >
            {messages[currentIndex]}
          </MotiText>
        )}

        {showSuccess && (
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={[styles.text, { marginTop: 20 }]}
          >
            You're all set!
          </MotiText>
        )}
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: Colors.light.background,
  },
  lottie: {
    width: 200,
    height: 200,
    color: Colors.light.background,
  },
  text: {
    marginTop: 30,
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    fontFamily: "Satoshi-Medium",
    width: width * 0.8,
  },
});

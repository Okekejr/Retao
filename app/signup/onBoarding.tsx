import { AnimatedDots } from "@/components/ui/animationDots";
import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { getOnboardingIntroUtils } from "@/utils";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function OnboardingIntroScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < OnboardingIntroUtils.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push("/signup/signupForm");
    }
  };

  const OnboardingIntroUtils = getOnboardingIntroUtils();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContent}>
        <View style={styles.carouselWrapper}>
          <FlatList
            ref={flatListRef}
            data={OnboardingIntroUtils}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image
                  source={item.image}
                  style={styles.image}
                  contentFit="contain"
                />
                <CustomText style={styles.title}>{item.title}</CustomText>
                <CustomText style={styles.desc}>{item.desc}</CustomText>
              </View>
            )}
          />

          <AnimatedDots
            total={OnboardingIntroUtils.length}
            currentIndex={currentIndex}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <CustomText style={styles.buttonText}>
          {currentIndex < OnboardingIntroUtils.length - 1 ? "Next" : "Continue"}
        </CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselWrapper: {
    alignItems: "center",
    width: width,
    gap: 20,
  },
  slide: {
    width,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  desc: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  nextButton: {
    position: "absolute",
    bottom: 50,
    right: 24,
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "flex-end",
    marginTop: 50,
  },
  button: {
    marginBottom: 32,
    width: width * 0.8,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});

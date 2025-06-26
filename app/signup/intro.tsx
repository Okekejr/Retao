import CustomHeading from "@/components/ui/customHeading";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { AppName } from "@/constants/random";
import { t } from "@/localization/t";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default function IntroScreen() {
  const router = useRouter();

  const handleStart = () => router.push("/signup/onBoarding");

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            gap: 20,
            justifyContent: "center",
          }}
        >
          <Animatable.View animation="bounceIn" delay={500}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.image}
              contentFit="contain"
            />
          </Animatable.View>

          <Animatable.View animation="fadeInDown" duration={1000}>
            <View style={{ gap: 10 }}>
              <CustomHeading>
                {t("introScreen.welcomeHeading", { appName: AppName })}
              </CustomHeading>
              <CustomText style={styles.subheading}>
                {t("introScreen.welcomeSubheading")}
              </CustomText>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInDown" duration={1000}>
            <CustomText style={styles.description}>
              {t("introScreen.description")}
            </CustomText>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={800}>
            <TouchableOpacity style={styles.nextButton} onPress={handleStart}>
              <CustomText style={styles.buttonText}>
                {t("listingIntro.getStarted")}
              </CustomText>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  subheading: {
    fontSize: 16,
    color: Colors.light.textTertiery,
  },
  description: {
    fontSize: 16,
    color: Colors.light.textSecondary,
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
});

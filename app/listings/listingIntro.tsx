import { IntroCardListing } from "@/components/core/listing/introCard";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h2 } from "@/constants/random";
import { IntroUtils } from "@/utils";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function ListingIntroScreen() {
  const router = useRouter();

  const handleStart = () => router.push("/listings/listingForms");

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <View style={styles.iconRow}>
              <BackButton
                iconName="close"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              />
            </View>

            <CustomText style={[styles.heading, h2]}>
              Let’s help you list your item!
            </CustomText>

            <View style={styles.stepsContainer}>
              <FlatList
                data={IntroUtils}
                keyExtractor={(item) => item.key}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <MotiView
                    key={item.key}
                    from={{ opacity: 0, translateY: 10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      delay: 500 + index * 80,
                      type: "timing",
                      duration: 500,
                    }}
                    style={{
                      backgroundColor: Colors.light.surfaceArea,
                      borderRadius: 16,
                    }}
                  >
                    <IntroCardListing
                      title={item.title}
                      desc={item.desc}
                      index={index + 1}
                      image={item.image}
                    />
                  </MotiView>
                )}
                contentContainerStyle={{ gap: 30 }}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <CustomText style={styles.buttonText}>Get Started</CustomText>
          </TouchableOpacity>
        </View>
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
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    marginTop: 30,
  },
  stepsContainer: {
    marginTop: 30,
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
});

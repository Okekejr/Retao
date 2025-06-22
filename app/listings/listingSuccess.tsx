import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useListing } from "@/context/listingContext";
import { useGetUserData } from "@/hooks/useGetUserData";
import { themeColor } from "@/utils";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";

export default function ListingSuccess() {
  const router = useRouter();
  const { resetFormData } = useListing();
  const { refreshData } = useGetUserData();
  const bg = themeColor("background");

  const handleFinish = () => {
    try {
      resetFormData();
      refreshData();
      router.push("/listings");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <InnerContainer style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Animatable.View
              animation="fadeInDown"
              duration={1000}
              style={styles.header}
            >
              <CustomListingHeader
                heading="🎉 Listing Created!"
                subHeading="Your item is now available for renting or lending."
                style={{ textAlign: "center" }}
              />
            </Animatable.View>

            <Animatable.View animation="bounceIn" delay={500}>
              <LottieView
                source={require("../../assets/confetti.json")}
                autoPlay
                loop={true}
                style={styles.lottie}
              />
            </Animatable.View>
          </View>

          <Animatable.View animation="fadeInUp" delay={800}>
            <TouchableOpacity onPress={handleFinish} style={styles.button}>
              <Text style={styles.buttonText}>Finish</Text>
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
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    textAlign: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingVertical: 20,
  },
  lottie: {
    width: "100%",
    height: 300,
    marginBottom: 50,
  },
  button: {
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

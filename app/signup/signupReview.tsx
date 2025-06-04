import { InfoBlock } from "@/components/core/listing/infoBlock";
import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { BASE_URL } from "@/constants/random";
import { userProfile, useUserData } from "@/context/userContext";
import { avatarsT } from "@/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  DimensionValue,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const avatars: avatarsT = [
  { id: "avatar1", src: require("../../assets/img/avatar.png") },
  { id: "avatar2", src: require("../../assets/img/avatar2.png") },
];

export default function SignupReviewScreen() {
  const router = useRouter();
  const { userData, updateUserForm } = useUserData();

  const avatar = avatars.find((a) => a.id === userData.avatar);

  const progressPercentage: DimensionValue = `${
    (userData.current_step / userData.total_steps) * 100
  }%`;

  const handleBack = () => {
    updateUserForm("current_step", userData.current_step - 1);
    router.back();
  };

  const handleNext = async () => {
    try {
      // make API CALL to save data here, if successful send to success screen
      const res = await fetch(`${BASE_URL}users/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userData.id,
          name: userData.name,
          handle: userData.handle,
          avatar: userData.avatar,
          bio: userData.bio,
          location: userData.location,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to save profile");

      try {
        const token = await SecureStore.getItemAsync("token");

        const auth = await fetch(`${BASE_URL}auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await auth.json();

        if (auth.ok) {
          const fields: (keyof userProfile)[] = [
            "id",
            "email",
            "name",
            "handle",
            "avatar",
            "bio",
            "location",
            "join_date",
            "stats",
            "listings",
            "borrowedItems",
            "current_step",
            "total_steps",
          ];
          fields.forEach((key) => {
            if (data[key] !== undefined) {
              updateUserForm(key, data[key]);
            }
          });
        } else {
          console.error("Failed to fetch user profile:", data.error);
        }
      } catch (error: any) {
        console.error("Failed to authenticate user:", error.message);
      }

      router.replace("/signup/loadingScreen");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <CustomProgressBar progressPercentage={progressPercentage} />

            <CustomListingHeader
              heading="🎉 All Set!"
              subHeading="Take a quick look and make sure everything looks good before you continue."
            />

            <View>
              <Image
                source={avatar?.src}
                contentFit="cover"
                style={styles.image}
              />
            </View>

            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
              <InfoBlock label="Name" value={userData.name} />
              <InfoBlock label="Handle" value={userData.handle} />
              <InfoBlock label="Location" value={userData.location} />
              <InfoBlock label="Bio" value={userData.bio} />
            </ScrollView>
          </View>

          <ListingButtons
            handleBack={handleBack}
            handleNext={handleNext}
            nextBtnTitle="Submit"
          />
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
  label: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
});

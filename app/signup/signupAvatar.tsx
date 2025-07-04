import { CustomListingHeader } from "@/components/ui/customListingHeader";
import { CustomProgressBar } from "@/components/ui/customProgressBar";
import { InnerContainer } from "@/components/ui/innerContainer";
import { ListingButtons } from "@/components/ui/listingButtons";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { t } from "@/localization/t";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  DimensionValue,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type avatarsT = {
  id: string;
  src: any;
}[];

type avatar = {
  id: string;
  src: any;
};

const avatars: avatarsT = [
  { id: "avatar1", src: require("../../assets/img/avatar.png") },
  { id: "avatar2", src: require("../../assets/img/avatar2.png") },
];

export default function SignupAvatarScreen() {
  const router = useRouter();
  const { userData, updateUserForm } = useUserData();
  const [selected, setSelected] = useState<avatar | null>(null);

  const progressPercentage: DimensionValue = `${
    (userData.current_step / userData.total_steps) * 100
  }%`;

  const handleBack = () => {
    updateUserForm("current_step", userData.current_step - 1);
    router.back();
  };

  const handleNext = () => {
    try {
      updateUserForm("current_step", userData.current_step + 1);
      console.log(selected && selected.id);
      selected !== null && updateUserForm("avatar", selected.id);
      router.push("/signup/signupBioLoc");
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
              heading={t("signupAvatar.heading")}
              subHeading={t("signupAvatar.subHeading")}
              style={{ color: Colors.light.text }}
            />

            <View style={styles.avatarRow}>
              {avatars.map((avatar) => (
                <TouchableOpacity
                  key={avatar.id}
                  style={[
                    styles.avatarWrapper,
                    selected === avatar && styles.selectedAvatar,
                  ]}
                  onPress={() => setSelected(avatar)}
                >
                  <Image
                    source={avatar.src}
                    style={styles.avatarImage}
                    contentFit="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <ListingButtons
            handleBack={handleBack}
            handleNext={handleNext}
            disabled={selected === null}
            styleBackText={{ color: "#000" }}
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
  avatarRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 32,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  selectedAvatar: {
    borderColor: "#111",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});

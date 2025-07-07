import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { useGetPlans, useRevenueCatPlans } from "@/hooks/usePlans";
import { t } from "@/localization/t";
import {
  formatSubscriptionPeriod,
  getPlanColor,
  showToast,
  themeColor,
} from "@/utils";
import * as Linking from "expo-linking";
import LottieView from "lottie-react-native";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { PreviewPlans } from "./previewPlans";

interface SelectPlansProps {
  closeModal: () => void;
}

export const SelectPlans = ({ closeModal }: SelectPlansProps) => {
  const {
    offerings,
    isLoading,
    isPending,
    isPreviewMode,
    handleSubscribe,
    handleRestore,
  } = useRevenueCatPlans();

  const { data: plans, isLoading: loadingPlans } = useGetPlans();

  const { userData } = useUserData();
  const bg = themeColor("background");
  const text = themeColor("text");

  const handleOpenLink = async (href: string) => {
    const supported = await Linking.canOpenURL(href);
    if (supported) {
      await Linking.openURL(href);
    } else {
      showToast({
        type: "error",
        text1: t("profile.toasts.invalidLink.title"),
        message: t("profile.toasts.invalidLink.message"),
      });
    }
  };

  return (
    <InnerContainer>
      {isLoading ||
        (loadingPlans && (
          <View
            style={[
              { flex: 1, justifyContent: "center", alignItems: "center" },
              { backgroundColor: bg },
            ]}
          >
            <Animatable.View animation="bounceIn">
              <LottieView
                source={require("../../../assets/loading.json")}
                autoPlay
                loop={false}
                style={styles.lottie}
              />
            </Animatable.View>
          </View>
        ))}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CustomText style={[h3, { color: text }]}>
          {t("plans.header")}
        </CustomText>

        {Platform.OS === "ios" && (
          <TouchableOpacity onPress={handleRestore}>
            <CustomText style={styles.restoreText}>
              Restore Purchases
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

      {isPreviewMode ? (
        <PreviewPlans userData={userData} plans={plans} />
      ) : (
        <FlatList
          data={offerings?.availablePackages || []}
          keyExtractor={(item) => item.identifier}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => {
            const isCurrent = userData.subscription_plan === item.identifier;

            return (
              <View
                style={[
                  styles.card,
                  { borderColor: getPlanColor(item.identifier) },
                ]}
              >
                <CustomText style={[styles.name, { color: text }]}>
                  {item.product.title}
                </CustomText>
                <CustomText style={styles.feature} numberOfLines={2}>
                  {item.product.description}
                </CustomText>
                <CustomText style={[styles.price, { color: text }]}>
                  {item.product.priceString}
                </CustomText>
                <CustomText
                  style={{ fontSize: 13, color: text, marginBottom: 10 }}
                >
                  {formatSubscriptionPeriod(item.product.subscriptionPeriod)}
                </CustomText>

                <TouchableOpacity
                  onPress={() => handleSubscribe(item)}
                  disabled={isCurrent || isPending || isPreviewMode}
                  style={[
                    styles.nextButton,
                    {
                      backgroundColor: isCurrent
                        ? "#ddd"
                        : getPlanColor(item.identifier),
                    },
                  ]}
                >
                  <CustomText style={styles.buttonText}>
                    {isCurrent
                      ? "Current Plan"
                      : isPending
                      ? "Subscribing..."
                      : isPreviewMode
                      ? "Preview Mode"
                      : "Select Plan"}
                  </CustomText>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      <View
        style={{
          marginBottom: 24,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 12,
          gap: 8,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            handleOpenLink(
              "https://docs.google.com/document/d/1PbrlztJt6Rkb2lUXm7vAXWbaVM1SU8FAOSLHJLc0U9g/edit"
            )
          }
        >
          <CustomText
            style={{
              textDecorationLine: "underline",
              color: Colors.light.primary,
              fontSize: 13,
            }}
          >
            Privacy Policy
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleOpenLink(
              "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            )
          }
        >
          <CustomText
            style={{
              textDecorationLine: "underline",
              color: Colors.light.primary,
              fontSize: 13,
            }}
          >
            Terms of Use
          </CustomText>
        </TouchableOpacity>
      </View>
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
  container: { paddingBottom: 24 },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  name: { fontSize: 18, fontFamily: "Satoshi-Bold", marginBottom: 8 },
  feature: { fontSize: 14, marginBottom: 8, color: "#666" },
  price: { fontSize: 16, fontFamily: "Satoshi-Bold", marginBottom: 10 },
  nextButton: { paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontFamily: "Satoshi-Bold" },
  restoreText: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: Colors.light.primary,
    textAlign: "right",
  },
});

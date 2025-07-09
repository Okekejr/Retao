// @ts-nocheck

import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { useGetUserData } from "@/hooks/useGetUserData";
import { useValidateIosReceipt } from "@/hooks/usePlans";
import { t } from "@/localization/t";
import {
  extractPlanKey,
  formatSubscriptionPeriod,
  getPlanColor,
  showToast,
  themeColor,
} from "@/utils";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getAvailablePurchases,
  PurchaseError,
  requestSubscription,
  useIAP,
} from "react-native-iap";

interface SelectPlansProps {
  closeModal: () => void;
}

const subscriptionSkus =
  Platform.select({
    ios: ["retao_pro_monthly", "retao_unlimited_monthly"],
  }) ?? [];

export const SelectPlans = ({ closeModal }: SelectPlansProps) => {
  const {
    connected,
    getSubscriptions,
    subscriptions,
    currentPurchase,
    finishTransaction,
  } = useIAP();

  console.log(currentPurchase);

  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const { userData } = useUserData();
  const { refreshData } = useGetUserData();

  const bg = themeColor("background");
  const text = themeColor("text");
  const textSec = themeColor("textSecondary");

  const { mutateAsync: validateReceipt } = useValidateIosReceipt();

  useEffect(() => {
    if (connected) getSubscriptions({ skus: subscriptionSkus });
  }, [connected]);

  const handleBuySubscription = async (productId: string) => {
    setLoadingProductId(productId);
    try {
      await requestSubscription({ sku: productId });
    } catch (err) {
      if (err instanceof PurchaseError) {
        showToast({
          type: "error",
          text1: t("subscription.toast.purchaseFailed.title"),
          message: err.message,
        });
      }
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleRestore = async () => {
    try {
      const restored = await getAvailablePurchases();
      if (restored.length > 0) {
        showToast({
          type: "success",
          text1: t("subscription.toast.restored.title"),
          message: t("subscription.toast.restored.message"),
        });
      }
    } catch (err) {
      showToast({
        type: "error",
        text1: t("subscription.toast.restoreFailed.title"),
        message: t("subscription.toast.restoreFailed.message"),
      });
    }
  };

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

  useEffect(() => {
    const validateCurrentPurchase = async () => {
      const receipt = currentPurchase?.transactionReceipt;
      if (Platform.OS === "ios" && receipt) {
        try {
          const result = await validateReceipt(receipt);
          if (result?.planId) {
            showToast({
              type: "success",
              text1: t("subscription.toast.subscriptionActive.title"),
              message: t("subscription.toast.subscriptionActive.message", {
                planId: result.planId,
              }),
            });
            refreshData();
          } else {
            showToast({
              type: "error",
              text1: t("subscription.toast.validationFailed.title"),
              message: t("subscription.toast.validationFailed.message"),
            });
          }
        } catch (err: any) {
          showToast({
            type: "error",
            text1: t("subscription.toast.validationError.title"),
            message:
              err.message || t("subscription.toast.validationError.message"),
          });
        } finally {
          finishTransaction({ purchase: currentPurchase, isConsumable: false });
        }
      }
    };
    validateCurrentPurchase();
  }, [currentPurchase]);

  return (
    <InnerContainer style={{ marginHorizontal: 25 }}>
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
            <CustomText style={[styles.restoreText, { color: textSec }]}>
              {t("subscription.restorePurchases")}
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

      {subscriptions.length === 0 ? (
        <View style={[styles.loadingContainer, { backgroundColor: bg }]}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      ) : (
        <View style={{ marginVertical: 20, gap: 16 }}>
          {subscriptions.map((item) => {
            const planKey = extractPlanKey(item.productId);
            const isCurrent = userData.subscription_plan === planKey;

            return (
              <View
                key={item.productId}
                style={[styles.card, { borderColor: getPlanColor(item.title) }]}
              >
                <CustomText style={[styles.name, { color: text }]}>
                  {item.title}
                </CustomText>
                <View style={{ marginVertical: 4 }}>
                  {item.description &&
                    item.description.split(",").map((feature, idx) => (
                      <CustomText
                        key={idx}
                        style={[styles.feature, { color: textSec }]}
                      >
                        ✔️ {feature}
                      </CustomText>
                    ))}
                </View>
                <CustomText style={[styles.price, { color: text }]}>
                  {item.localizedPrice}{" "}
                  {formatSubscriptionPeriod(item.subscriptionPeriodUnitIOS)}
                </CustomText>

                <TouchableOpacity
                  onPress={() => {
                    console.log(item.productId);
                    handleBuySubscription(item.productId);
                  }}
                  disabled={isCurrent || loadingProductId !== null}
                  style={[
                    styles.nextButton,
                    {
                      backgroundColor: isCurrent
                        ? "#ddd"
                        : Colors.light.primary,
                    },
                  ]}
                >
                  {loadingProductId === item.productId && !isCurrent ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <CustomText style={styles.buttonText}>
                      {isCurrent
                        ? t("subscription.currentPlan")
                        : t("subscription.subscribe")}
                    </CustomText>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.linksContainer}>
        <TouchableOpacity
          onPress={() =>
            handleOpenLink(
              "https://docs.google.com/document/d/1PbrlztJt6Rkb2lUXm7vAXWbaVM1SU8FAOSLHJLc0U9g/edit"
            )
          }
        >
          <CustomText style={[styles.linkText, { color: textSec }]}>
            {t("profile.privacyPolicy")}
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleOpenLink(
              "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            )
          }
        >
          <CustomText style={[styles.linkText, { color: textSec }]}>
            {t("profile.termsOfUse")}
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
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  name: { fontSize: 18, fontFamily: "Satoshi-Bold", marginBottom: 8 },
  feature: { fontSize: 14, marginBottom: 8 },
  price: { fontSize: 16, fontFamily: "Satoshi-Bold", marginBottom: 10 },
  nextButton: { paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontFamily: "Satoshi-Bold" },
  restoreText: {
    fontSize: 14,
    textAlign: "right",
  },
  loadingContainer: {
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  linksContainer: {
    marginBottom: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  linkText: {
    fontSize: 13,
  },
});

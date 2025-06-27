import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { useRevenueCatPlans } from "@/hooks/usePlans";
import { t } from "@/localization/t";
import { getPlanColor, themeColor } from "@/utils";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

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

  const { userData } = useUserData();
  const bg = themeColor("background");
  const text = themeColor("text");

  return (
    <InnerContainer>
      {isLoading && (
        <View style={[styles.loaderOverlay, { backgroundColor: bg }]}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      )}

      <View style={styles.modalHeader}>
        <CustomText style={[h3, { color: text }]}>
          {t("plans.header")}
        </CustomText>

        {Platform.OS === "ios" && (
          <TouchableOpacity onPress={handleRestore} style={styles.restoreBtn}>
            <CustomText style={styles.restoreText}>
              Restore Purchases
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

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
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: { paddingBottom: 20 },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  container: { paddingBottom: 80 },
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
  restoreBtn: { marginTop: 8 },
  restoreText: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: Colors.light.primary,
    textAlign: "right",
  },
});

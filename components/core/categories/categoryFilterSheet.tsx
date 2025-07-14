import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { t } from "@/localization/t";
import { Filters } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const subscriptionOptions = ["free", "pro", "unlimited"];

interface CategoryFilterSheetProps {
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
  activeFilters: Filters;
}

export const CategoryFilterSheet = ({
  onClose,
  onApplyFilters,
  activeFilters,
}: CategoryFilterSheetProps) => {
  const [localFilters, setLocalFilters] = useState<Filters>(activeFilters);

  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  const toggleSubscription = (plan: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      subscriptionPlans: prev.subscriptionPlans.includes(plan)
        ? prev.subscriptionPlans.filter((p) => p !== plan)
        : [...prev.subscriptionPlans, plan],
    }));
  };

  const handleResetFilters = () => {
    const resetFilters = { location: "", subscriptionPlans: [] };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <InnerContainer style={{ paddingHorizontal: 24 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.modalHeader}>
          <CustomText style={[h3, { color: "#000" }]}>
            {t("Filter.title")}
          </CustomText>
        </View>

        {/* Location Input */}
        <View style={{ marginBottom: 24 }}>
          <CustomText style={[styles.label]}>
            {t("listingReview.labels.location")}
          </CustomText>
          <TextInput
            placeholder={t("SignUpBioLoc.placeholders.location")}
            placeholderTextColor="#999"
            value={localFilters.location}
            onChangeText={(text) =>
              setLocalFilters((prev) => ({ ...prev, location: text }))
            }
            style={styles.textInputStyle}
          />
        </View>

        {/* Subscription Filter Chips */}
        <CustomText style={styles.label}>{t("Filter.filterPlans")}</CustomText>
        <View style={styles.subContainer}>
          {subscriptionOptions.map((plan) => {
            const isSelected = localFilters.subscriptionPlans.includes(plan);
            return (
              <TouchableOpacity
                key={plan}
                onPress={() => {
                  Haptics.selectionAsync();
                  toggleSubscription(plan);
                }}
                style={[
                  styles.subBubble,
                  {
                    backgroundColor: isSelected
                      ? Colors.light.primary
                      : "#f0f0f0",
                    borderColor: isSelected ? Colors.light.primary : "#ddd",
                  },
                ]}
              >
                <CustomText
                  style={{
                    color: isSelected ? "#fff" : "#333",
                    fontSize: 13,
                  }}
                >
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actnBtn}>
          <TouchableOpacity
            onPress={() => {
              Haptics.selectionAsync();
              handleResetFilters();
            }}
          >
            <CustomText style={[styles.resetBtn, { color: "#333" }]}>
              {t("btnTexts.reset")}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onApplyFilters(localFilters);
            }}
            style={styles.applyBtn}
          >
            <CustomText style={{ color: "#fff", fontWeight: "600" }}>
              {t("btnTexts.apply")}
            </CustomText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            Haptics.selectionAsync();
            handleClose();
          }}
          style={styles.closeBtn}
        >
          <Ionicons name="close-outline" size={20} color="#007aff" />
          <CustomText style={{ color: "#007aff", fontWeight: "500" }}>
            {t("btnTexts.close")}
          </CustomText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 16,
    alignItems: "center",
  },
  label: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fafafa",
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 28,
  },
  subBubble: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  resetBtn: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  applyBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12,
    alignItems: "center",
  },
  closeBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  actnBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});

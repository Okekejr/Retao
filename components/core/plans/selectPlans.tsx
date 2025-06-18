import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { useUserData } from "@/context/userContext";
import { useGetPlans, useSubscribeToPlan } from "@/hooks/usePlans";
import { getPlanColor } from "@/utils";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface SelectPlansProps {
  closeModal: () => void;
}

export const SelectPlans = ({ closeModal }: SelectPlansProps) => {
  const { data: plans, isLoading } = useGetPlans();
  const { mutate: subscribeToPlan, isPending } = useSubscribeToPlan();
  const { userData } = useUserData();

  return (
    <InnerContainer>
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      )}

      <View style={styles.modalHeader}>
        <CustomText style={h3}>Subscription plans</CustomText>
      </View>

      <View>
        <FlatList
          data={plans}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => {
            const isCurrent = userData.subscription_plan === item.id;

            return (
              <View
                style={[styles.card, { borderColor: getPlanColor(item.id) }]}
              >
                <CustomText style={styles.name}>{item.name}</CustomText>
                <View style={{ marginVertical: 8 }}>
                  {item.features &&
                    item.features.map((feature, idx) => (
                      <CustomText key={idx} style={styles.feature}>
                        • {feature}
                      </CustomText>
                    ))}
                </View>
                <CustomText style={styles.price}>
                  {item.price > 0
                    ? `$${(item.price / 100).toFixed(2)}/mo`
                    : "Free"}
                </CustomText>

                <TouchableOpacity
                  onPress={() => subscribeToPlan(item.id)}
                  disabled={isCurrent || isPending}
                  style={[
                    styles.nextButton,
                    {
                      backgroundColor: isCurrent
                        ? "#ddd"
                        : getPlanColor(item.id),
                      marginTop: 12,
                    },
                  ]}
                >
                  <CustomText style={styles.buttonText}>
                    {isCurrent
                      ? "Current Plan"
                      : isPending
                      ? "Subscribing..."
                      : "Upgrade"}
                  </CustomText>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 16,
    alignItems: "center",
  },
  container: {
    padding: 16,
  },
  card: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  feature: {
    fontSize: 13,
    color: "#444",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
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
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

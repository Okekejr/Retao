import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { userProfile } from "@/context/userContext";
import { SubscriptionPlan } from "@/types";
import { getPlanColor } from "@/utils";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

interface PreviewPlans {
  plans: SubscriptionPlan[] | undefined;
  userData: userProfile;
}

export const PreviewPlans = ({ plans, userData }: PreviewPlans) => {
  return (
    <>
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
                    {isCurrent ? "Current Plan" : "Select Plan"}
                  </CustomText>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
  },
  name: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    fontWeight: "bold",
  },
  feature: {
    fontFamily: "Satoshi-Bold",
    fontSize: 13,
    color: "#444",
  },
  price: {
    fontFamily: "Satoshi-Bold",
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
});

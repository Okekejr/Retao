import { getPlanColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

export const SubscriptionBadge = ({
  plan,
  inline = false,
  style,
}: {
  plan: string;
  inline?: boolean;
  style?: ViewStyle;
}) => {
  if (plan === "free") return null;

  if (inline) {
    return (
      <View
        style={[
          styles.inlineBadge,
          { backgroundColor: getPlanColor(plan) },
          style,
        ]}
      >
        <Ionicons
          name={plan === "pro" ? "star" : "diamond"}
          size={10}
          color="#fff"
          style={{ marginRight: 4 }}
        />
        <Text style={styles.inlineText}>{plan}</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.badge, { backgroundColor: getPlanColor(plan) }, style]}
    >
      <Ionicons
        name={plan === "pro" ? "star" : "diamond"}
        size={10}
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 10,
  },
  inlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  inlineText: {
    color: "#fff",
    fontSize: 10,
    textTransform: "capitalize",
  },
});

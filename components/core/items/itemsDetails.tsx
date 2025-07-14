import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { h3, ItemStatus, UserRole } from "@/constants/random";
import { t } from "@/localization/t";
import { formatDate, formatTime } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const statusColors = {
  listed: "#4CAF50",
  borrowed: "#FF9800",
};

interface StatusBadgeProps {
  status: ItemStatus;
}

interface renderTimelineProps extends StatusBadgeProps {
  releasedOn: string | undefined;
  dueDate: string | undefined;
}

interface renderButtonsProps extends StatusBadgeProps {
  itemId: string;
  userRole: UserRole;
  isPending: boolean;
  func: {
    handleEditListing: (itemId: string) => void;
    handleMarkAsReturned: () => void;
    handleMessageOwner: () => void;
    handleRequestToBorrow: () => void;
  };
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <View style={[styles.badge, { backgroundColor: statusColors[status] }]}>
      <CustomText style={[h3, styles.badgeText]}>
        {status.toUpperCase()}
      </CustomText>
    </View>
  );
};

export const RenderTimeline = ({
  status,
  releasedOn,
  dueDate,
}: renderTimelineProps) => {
  if (status === "borrowed") {
    return (
      <View style={styles.timelineContainer}>
        {releasedOn && (
          <CustomText style={styles.timelineText}>
            {status.toUpperCase()} {t("itemDetails.on")}{" "}
            {releasedOn &&
              `${formatDate(releasedOn)} ${t("itemDetails.at")} ${formatTime(
                releasedOn
              )}`}
          </CustomText>
        )}

        {dueDate && (
          <CustomText style={styles.timelineText}>
            {t("itemDetails.dueBy")}{" "}
            {dueDate &&
              `${formatDate(dueDate)} ${t("itemDetails.at")} ${formatTime(
                dueDate
              )}`}
          </CustomText>
        )}
      </View>
    );
  }
  return null;
};

export const RenderButton = ({
  itemId,
  userRole,
  status,
  isPending,
  func,
}: renderButtonsProps) => {
  const isListed = status === "listed";
  const isBorrowed = status === "borrowed";

  if (userRole === "owner") {
    if (isListed) {
      return (
        <TouchableOpacity
          style={[styles.primaryButton, styles.buttonHover, { width: "100%" }]}
          onPress={() => func.handleEditListing(itemId)}
        >
          <CustomText style={styles.primaryButtonText}>
            {t("itemDetails.edit")}
          </CustomText>
        </TouchableOpacity>
      );
    } else if (isBorrowed) {
      return (
        <TouchableOpacity
          style={[
            styles.secondaryButton,
            styles.buttonHover,
            { width: "100%" },
          ]}
          disabled={isPending}
          onPress={func.handleMarkAsReturned}
        >
          <CustomText style={styles.secondaryButtonText}>
            {t("itemDetails.returned")}
          </CustomText>
        </TouchableOpacity>
      );
    }
  }

  if (userRole === "viewer") {
    return (
      <>
        {(isListed || isBorrowed) && (
          <TouchableOpacity
            style={[styles.primaryButton, styles.buttonHover]}
            onPress={func.handleRequestToBorrow}
          >
            <CustomText style={styles.primaryButtonText}>
              {t("itemDetails.request")}
            </CustomText>
          </TouchableOpacity>
        )}
        <View
          style={[styles.dotHover, { backgroundColor: Colors.light.primary }]}
        ></View>
        {(isListed || isBorrowed) && (
          <TouchableOpacity
            style={[styles.secondaryButton, styles.msgHover]}
            onPress={() => func.handleMessageOwner()}
          >
            <Ionicons
              name="mail-outline"
              size={28}
              color={Colors.light.primary}
            />
          </TouchableOpacity>
        )}
      </>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: { color: "#fff", fontSize: 12 },
  timelineContainer: { marginVertical: 10 },
  timelineText: { fontSize: 13, color: "gray" },
  primaryButton: {
    marginTop: 16,
    backgroundColor: Colors.light.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
  secondaryButton: {
    marginTop: 10,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.light.primary,
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
  },
  buttonHover: {
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    height: 65, // Set the height
    borderRadius: 65 / 2,
  },
  dotHover: {
    width: "1.6%",
    height: "10%",
    marginVertical: "auto",
    borderRadius: 100,
  },
  msgHover: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: 65, // Set the height
    borderRadius: 100,
    borderTopLeftRadius: 20,
  },
});

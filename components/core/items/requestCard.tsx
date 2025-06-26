import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useUpdateBorrowRequest } from "@/hooks/useBorrowRequests";
import { t } from "@/localization/t";
import { Decision } from "@/types";
import {
  addReturnDateToCalendar,
  getStatusStyle,
  showToast,
  themeColor,
  toLocalISOString,
} from "@/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { FC, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface RequestCardProps {
  id: string;
  item_id: string;
  owner_id: string;
  borrower_id: string;
  status: "pending" | "accepted" | "rejected";
  due_date: string | null;
  created_at: string;
  updated_at: string;
  borrower_name: string;
  borrower_contact: string;
  item_title: string;
  mode: "owner" | "borrower";
}

export const RequestCard: FC<RequestCardProps> = ({
  id,
  item_title,
  item_id,
  borrower_name,
  status,
  mode,
}) => {
  const bg = themeColor("background");
  const surfaceArea = themeColor("surfaceArea");
  const text = themeColor("text");
  const textSec = themeColor("textSecondary");
  const textTertiary = themeColor("textTertiery");
  const router = useRouter();
  const { mutate: updateRequest } = useUpdateBorrowRequest();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handlePress = () => {
    if (!id) return;
    router.push({
      pathname: `/items/[id]`,
      params: { id: item_id },
    });
  };

  const handleDecision = ({ requestId, status }: Decision) => {
    if (status === "accepted") {
      setShowPicker(true);
    } else {
      updateRequest({ requestId, status });
    }
  };

  const onDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSubmitDate = async () => {
    try {
      setShowPicker(false);
      updateRequest({
        requestId: id,
        status: "accepted",
        dueDate: toLocalISOString(selectedDate),
      });
      await addReturnDateToCalendar(item_title, selectedDate);
      showToast({
        type: "success",
        text1: "Calendar updated",
        message: "Return reminder added to your calendar.",
      });
    } catch (error) {
      console.warn("Calendar error:", error);
    }
  };

  return (
    <Pressable
      style={[styles.card, { backgroundColor: bg }]}
      onPress={handlePress}
    >
      <CustomText style={[styles.itemTitle, { color: text }]} numberOfLines={1}>
        {item_title}
      </CustomText>
      <CustomText
        style={[
          styles.borrowerName && { color: textSec },
          mode === "borrower" && getStatusStyle(status),
        ]}
        numberOfLines={1}
      >
        {mode === "owner"
          ? `Requested by: ${borrower_name}`
          : `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`}
      </CustomText>

      {mode === "owner" && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() =>
              handleDecision({ requestId: id, status: "accepted" })
            }
          >
            <CustomText style={styles.buttonText}>
              {t("btnTexts.accept")}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() =>
              handleDecision({ requestId: id, status: "rejected" })
            }
          >
            <CustomText style={styles.buttonText}>
              {t("btnTexts.reject")}
            </CustomText>
          </TouchableOpacity>
        </View>
      )}

      {/* Date Picker Modal */}
      {showPicker && (
        <Modal transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View
              style={[styles.modalContent, { backgroundColor: textTertiary }]}
            >
              <CustomText style={[styles.modalTitle, { color: surfaceArea }]}>
                {t("btnTexts.selectDate")}
              </CustomText>

              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "calendar"}
                onChange={onDateChange}
              />

              <DateTimePicker
                value={selectedDate}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, time) => {
                  if (time) {
                    const updated = new Date(selectedDate);
                    updated.setHours(time.getHours());
                    updated.setMinutes(time.getMinutes());
                    setSelectedDate(updated);
                  }
                }}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <CustomText style={styles.cancelText}>
                    {t("btnTexts.cancel")}
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitDate}
                >
                  <CustomText style={styles.submitText}>
                    {t("btnTexts.submit")}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  borrowerName: {
    fontSize: 14,
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  acceptButton: {
    backgroundColor: Colors.light.primary,
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    fontFamily: "Satoshi-Bold",
    color: "#fff",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  cancelText: {
    color: "#888",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

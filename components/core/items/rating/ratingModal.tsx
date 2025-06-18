import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { StarRating } from "./starRating";

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: any) => void;
  borrower: string | undefined;
}

export const RatingModal = ({
  visible,
  onClose,
  onSubmit,
  borrower,
}: RatingModalProps) => {
  const [rating, setRating] = useState(0);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <CustomText style={styles.modalTitle}>
            Rate {borrower ? borrower : "user"}
          </CustomText>

          <StarRating rating={rating} onChange={(value) => setRating(value)} />

          <TouchableOpacity
            style={[styles.submitButton, rating === 0 && { opacity: 0.5 }]}
            disabled={rating === 0}
            onPress={() => {
              onSubmit(rating);
              onClose();
            }}
          >
            <CustomText style={styles.submitText}>Submit</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: Colors.light.primary,
    padding: 12,
    borderRadius: 8,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});

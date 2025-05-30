import { Colors } from "@/constants/Colors";
import {
  Dimensions,
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface CustomModalProps {
  children: React.ReactNode;
  modalVisible: boolean;
  closeModal: () => void;
  style?: StyleProp<ViewStyle>;
}

const { width } = Dimensions.get("window");

export const CustomModal = ({
  children,
  modalVisible,
  closeModal,
  style,
}: CustomModalProps) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.modalBackdrop}
        activeOpacity={1} // Prevent accidental clicks through to the background
        onPress={closeModal}
      >
        <View
          style={[styles.modalContent, style]}
          onStartShouldSetResponder={() => true}
        >
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end", // Align the modal to the bottom of the screen
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width, // Take up the full width
    height: "auto", // Take up 80% of the height from the bottom
    paddingVertical: 20,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

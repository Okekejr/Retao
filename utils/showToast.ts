import Toast from "react-native-toast-message";

type ToastType = "success" | "error";

export const showToast = ({
  type,
  message,
}: {
  type: ToastType;
  text1: string;
  message: string;
}) => {
  Toast.show({
    type,
    text1: message,
    position: "top",
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
  });
};

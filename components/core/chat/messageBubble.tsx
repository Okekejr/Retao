import CustomText from "@/components/ui/customText";
import { Message } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

interface MessageBubbleProps {
  item: Message;
  recipientId: string;
}

export const MessageBubble = ({ item, recipientId }: MessageBubbleProps) => {
  const isMine = item.sender_id !== recipientId;
  return (
    <View
      style={[styles.bubble, isMine ? styles.myBubble : styles.theirBubble]}
    >
      <CustomText style={styles.messageText}>{item.text}</CustomText>

      {isMine && item.read && (
        <Ionicons
          name="checkmark-done"
          size={14}
          color="green"
          style={{ marginTop: 4, alignSelf: "flex-end" }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
  },
  myBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderTopRightRadius: 0,
  },
  theirBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
});

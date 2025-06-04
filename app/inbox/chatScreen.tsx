import { ChatHeader } from "@/components/core/chat/chatHeader";
import { MessageBubble } from "@/components/core/chat/messageBubble";
import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { useMessages } from "@/hooks/useChat";
import { useRecipientProfile } from "@/hooks/useGetUserData";
import { useWebSocket } from "@/hooks/useWebsocket";
import { Message } from "@/types";
import { checkOrCreateConversation } from "@/utils/api/createConversation";
import { markMessagesAsRead } from "@/utils/api/sendMessage";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";

import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function ChatScreen() {
  const { recipientId } = useLocalSearchParams();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [typingUserId, setTypingUserId] = useState<string | null>(null);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const {
    latestMessage,
    sendMessage: sendWSMessage,
    isConnected,
  } = useWebSocket();
  const { data: messages, isLoading } = useMessages(conversationId ?? "");
  const queryClient = useQueryClient();
  const flatListRef = useRef<FlatList>(null);
  const [message, setMessage] = useState("");
  const [disableSend, setDisableSend] = useState(false);
  const { data: recipient } = useRecipientProfile(recipientId as string);

  const handleTyping = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (isConnected && conversationId && recipientId) {
      sendWSMessage({
        type: "typing",
        to: recipientId,
        conversationId,
      });
    }

    const timeout = setTimeout(() => {
      setTypingTimeout(null);
    }, 1000);

    setTypingTimeout(timeout);
  };

  const handleSend = async () => {
    if (message.trim() === "") return;

    try {
      let convId = conversationId as string;

      if (!convId) {
        const result = await checkOrCreateConversation(recipientId as string);
        convId = result.id;
        setConversationId(convId);
      }

      // Send over WebSocket
      sendWSMessage({
        type: "message",
        conversationId,
        recipientId,
        to: recipientId,
        text: message,
      });

      // Clear input locally
      setMessage("");
    } catch (err) {
      console.log("Send error:", err);
    }
  };

  useEffect(() => {
    if (!conversationId && recipientId) {
      (async () => {
        const result = await checkOrCreateConversation(recipientId as string);
        setConversationId(result.id);
      })();
    }
  }, [conversationId, recipientId]);

  useEffect(() => {
    if (
      latestMessage?.type === "message" &&
      latestMessage.conversationId === conversationId
    ) {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    }
  }, [latestMessage, conversationId]);

  useEffect(() => {
    setDisableSend(!message);
  }, [message]);

  useEffect(() => {
    if (
      latestMessage?.type === "typing" &&
      latestMessage.conversationId === conversationId
    ) {
      setTypingUserId(latestMessage.from);

      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => setTypingUserId(null), 3000);
      setTypingTimeout(timeout);
    }
  }, [latestMessage]);

  useEffect(() => {
    if (
      latestMessage?.type === "read" &&
      latestMessage.conversationId === conversationId
    ) {
      queryClient.setQueryData(["messages", conversationId], (old: any) => {
        if (!old) return old;
        return old.map((msg: any) =>
          latestMessage.messageIds.includes(msg.id)
            ? { ...msg, read: true }
            : msg
        );
      });
    }
  }, [latestMessage, conversationId]);

  useEffect(() => {
    if (!messages || !conversationId) return;

    const unread = (messages as Message[])
      .filter((msg) => !msg.read && msg.sender_id !== recipientId)
      .map((msg) => msg.id);

    if (unread.length > 0) {
      // Update locally (optional but snappier UI)
      queryClient.setQueryData(["messages", conversationId], (old: any) =>
        old?.map((msg: any) =>
          unread.includes(msg.id) ? { ...msg, read: true } : msg
        )
      );

      markMessagesAsRead(conversationId, unread).catch(console.error);

      sendWSMessage({
        type: "read",
        conversationId,
        messageIds: unread,
      });
    }
  }, [messages]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100); // short delay after render

    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <ChatHeader {...recipient} />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.inner}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={{ flex: 1 }}>
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <MessageBubble
                  item={item}
                  recipientId={recipientId as string}
                />
              )}
              scrollEnabled
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.chatContainer}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: true })
              }
            />

            {typingUserId && (
              <View style={{ paddingLeft: 20, marginBottom: 5 }}>
                <CustomText style={{ color: "#666" }}>
                  {recipient?.name || "User"} is typing...
                </CustomText>
              </View>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={message}
                onChangeText={(text) => {
                  setMessage(text);
                  handleTyping();
                }}
                multiline
              />

              <TouchableOpacity
                onPress={handleSend}
                disabled={disableSend}
                style={[
                  styles.sendButton,
                  disableSend
                    ? styles.sendButtonDisabled
                    : styles.sendButtonEnabled,
                ]}
              >
                <Ionicons
                  name="arrow-up-outline"
                  size={20}
                  color={disableSend ? "#000" : "#fff"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingBottom: 20,
  },
  inner: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 10, // add a bit of bottom padding
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fafafa",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#f1f1f1",
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonEnabled: {
    backgroundColor: "#007AFF",
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
});

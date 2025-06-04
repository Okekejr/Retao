import { BASE_URL } from "@/constants/random";
import * as SecureStore from "expo-secure-store";

export const sendMessage = async (conversationId: string, text: string) => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}conversations/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ conversationId, text }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
};

export const markMessagesAsRead = async (
  conversationId: string,
  messageIds: string[]
) => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}conversations/messages/read`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ conversationId, messageIds }),
  });

  if (!res.ok) throw new Error("Failed to mark messages as read");
  return res.json();
};

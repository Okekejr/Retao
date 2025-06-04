import { BASE_URL } from "@/constants/random";
import * as SecureStore from "expo-secure-store";

export const createConversation = async (recipientId: string) => {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipientId }),
  });

  if (!res.ok) throw new Error("Failed to create conversation");
  return res.json();
};

export async function checkOrCreateConversation(recipientId: string) {
  const token = await SecureStore.getItemAsync("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(
    `${BASE_URL}conversations/check?withUserId=${recipientId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();

  if (data.exists) {
    return { id: data.id, wasCreated: false };
  }

  const createRes = await fetch(`${BASE_URL}conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipientId }),
  });

  const created = await createRes.json();

  return { id: created.id, wasCreated: true };
}

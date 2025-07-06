import { BASE_URL } from "@/constants/random";
import { Conversations } from "@/types";
import { showToast } from "@/utils";
import { createConversation } from "@/utils/api/createConversation";
import { sendMessage } from "@/utils/api/sendMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

export const useConversations = () => {
  return useQuery<Conversations>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`${BASE_URL}conversations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch conversations");
      return res.json();
    },
    refetchInterval: 60000,
  });
};

export const useMessages = (conversationId: string) =>
  useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(
        `${BASE_URL}conversations/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
    enabled: !!conversationId,
    refetchInterval: 60000,
  });

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string) => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`${BASE_URL}conversations/${conversationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete conversation");
      return res.json();
    },
    onSuccess: () => {
      // Invalidate conversations list after deletion
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      showToast({
        type: "success",
        text1: "Deleted",
        message: "Conversation Deleted.",
      });
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      text,
    }: {
      token: string;
      conversationId: string;
      text: string;
    }) => sendMessage(conversationId, text),
    onSuccess: (_, variables) => {
      // Refetch messages for the conversation after sending a new message
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });
    },
  });
};

// Mutation hook to create a conversation
export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recipientId }: { token: string; recipientId: string }) =>
      createConversation(recipientId),
    onSuccess: () => {
      // Refetch conversations list after creating a new conversation
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

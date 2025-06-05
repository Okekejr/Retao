export type Conversations = {
  id: string; // conversation id
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  lastMessage: string;
  updatedAt: string;
  unread: boolean;
}[];

export interface Conversation {
  id: string; // conversation id
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  lastMessage: string;
  updatedAt: string;
  unread: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  text: string;
  created_at: string;
  read: boolean;
}

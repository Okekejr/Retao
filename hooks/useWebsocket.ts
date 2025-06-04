import { WS_URL } from "@/constants/random";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useRef, useState } from "react";

interface WSMessage {
  type: "message" | "read" | "typing" | "error";
  [key: string]: any;
}

export const useWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState<WSMessage | null>(
    null
  );

  // Initialize WebSocket connection
  const connect = useCallback(async () => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) return;

    const socket = new WebSocket(`${WS_URL}?token=${token}`);

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        console.log("📥 WS message received:", msg);
        setIncomingMessage(msg);
      } catch (err) {
        console.error("❌ Failed to parse WS message", err);
      }
    };

    socket.onerror = (e) => {
      console.error("❌ WebSocket error", e);
    };

    socket.onclose = () => {
      console.log("⚠️ WebSocket disconnected");
      setIsConnected(false);
      setTimeout(connect, 3000); // Try reconnecting in 3s
    };

    ws.current = socket;
  }, []);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
    };
  }, [connect]);

  // Send message via WebSocket
  const sendMessage = useCallback((data: WSMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not connected. Cannot send:", data);
    }
  }, []);

  return {
    isConnected,
    sendMessage,
    latestMessage: incomingMessage,
  };
};

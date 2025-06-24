import { LanguageProvider } from "@/context/languageContext";
import { ListingProvider } from "@/context/listingContext";
import {
  NotificationProvider,
  useNotifications,
} from "@/context/notificationContext";
import { UserProvider } from "@/context/userContext";
import { ThemeProvider, useTheme } from "@/context/userThemeContext";
import { useWebSocket } from "@/hooks/useWebsocket";
import { showToast, toastConfig } from "@/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

function WebSocketInitializer() {
  const { latestMessage } = useWebSocket();
  const { setNotifications } = useNotifications();

  useEffect(() => {
    if (!latestMessage) return;

    switch (latestMessage.type) {
      case "message":
        setNotifications((prev) => ({
          ...prev,
          messages: prev.messages + 1,
        }));

        showToast({
          type: "message",
          text1: "New message received",
          message: "Someone just messaged you!",
        });

        break;
    }
  }, [latestMessage]);

  return null;
}

export default function RootLayout() {
  const { theme } = useTheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.ttf"),
    "Satoshi-Medium": require("../assets/fonts/Satoshi-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <NotificationProvider>
            <WebSocketInitializer />
            <ListingProvider>
              <UserProvider>
                <Stack
                  screenOptions={{ headerShown: false, gestureEnabled: false }}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </UserProvider>
            </ListingProvider>
          </NotificationProvider>
          <StatusBar style={theme === "dark" ? "light" : "dark"} />
        </ThemeProvider>
      </LanguageProvider>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

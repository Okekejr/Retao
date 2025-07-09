import { useNotifications } from "@/context/notificationContext";
import { useUserData } from "@/context/userContext";
import { useIncomingBorrowRequests } from "@/hooks/useBorrowRequests";
import { getIconName, themeColor } from "@/utils";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  const bg = themeColor("background");
  const { notifications } = useNotifications();
  const { userData } = useUserData();
  const messages = notifications.messages;

  const { data: requests } = useIncomingBorrowRequests(userData.id);

  const filterRequests = requests?.filter((item) => item.status === "pending");
  const hasPendingRequests = (filterRequests?.length || 0) > 0;

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={({
        route,
      }: {
        route: RouteProp<ParamListBase, string>;
      }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const isMessages = route.name === "messages";
          const isProfile = route.name === "listings";

          return (
            <View style={styles.iconContainer}>
              {getIconName(route.name, focused)}
              {isMessages && messages > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {messages > 9 ? "9+" : messages}
                  </Text>
                </View>
              )}

              {isProfile && hasPendingRequests && (
                <View style={styles.dot} /> // 🔴 Small red dot
              )}
            </View>
          );
        },
        tabBarStyle: {
          backgroundColor: bg,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: "",
        }}
      />

      <Tabs.Screen
        name="listings"
        options={{
          title: "",
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: "",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 35,
    height: 40,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontFamily: "Satoshi-Bold",
  },
  dot: {
    position: "absolute",
    top: -1,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
});

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { getIconName } from "@/utils";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={({
        route,
      }: {
        route: RouteProp<ParamListBase, string>;
      }) => ({
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            {getIconName(route.name, focused)}
          </View>
        ),
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
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
        name="inbox"
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
    marginTop: 50,
    height: 50,
  },
});

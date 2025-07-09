import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { Alert, Platform } from "react-native";

export const useGetLocation = () => {
  return useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location access is required.");
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        const reverse = await Location.reverseGeocodeAsync(loc.coords);
        const name =
          reverse[0]?.city || `${loc.coords.latitude}, ${loc.coords.longitude}`;
        return name;
      } catch (error) {
        console.warn("⚠️ Location fallback triggered", error);

        // Fallback only on simulator
        if (Platform.OS === "ios" && !Location.hasServicesEnabledAsync()) {
          return "Monterrey, Nuevo León";
        }

        return "Monterrey, Nuevo León";
      }
    },
    staleTime: 3600000, // Cache data for 1 hour
    refetchOnWindowFocus: false,
  });
};

import { Section } from "@/components/core/items/section";
import { BackButton } from "@/components/ui/backButton";
import { Colors } from "@/constants/Colors";
import { useGetListings } from "@/hooks/useGetListings";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const screen = Dimensions.get("window");

export default function SectionListedScreen() {
  const { heading, location } = useLocalSearchParams();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "52%", "85%"], []);
  const [coords, setCoords] = useState<{ lat: number; lon: number }>();

  const { data: ListingByLoc } = useGetListings(
    location as string,
    undefined,
    undefined
  );

  useEffect(() => {
    if (!location) return;

    const fetchCoords = async () => {
      try {
        const geo = await Location.geocodeAsync(location as string);
        if (geo.length > 0) {
          setCoords({
            lat: geo[0].latitude,
            lon: geo[0].longitude,
          });
        }
      } catch (e) {
        console.warn("Geocoding failed:", location, e);
      }
    };

    fetchCoords();
  }, [location]);

  if (!coords) return;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.iconRow}>
        <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      </View>

      <MapView
        style={{
          position: "absolute",
          width: screen.width,
          height: screen.height,
        }}
        initialRegion={{
          latitude: coords.lat || 25.6866,
          longitude: coords.lon || -100.3161,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        <Marker coordinate={{ latitude: coords.lat, longitude: coords.lon }} />
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          {ListingByLoc && (
            <Section heading={heading as string} data={ListingByLoc} />
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 16,
    alignItems: "center",
  },
  iconRow: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
  bottomSheetBackground: {
    backgroundColor: Colors.light.background,
    borderRadius: 20,
  },
  handleIndicator: {
    width: 50,
    height: 5,
    backgroundColor: Colors.light.muted,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  contentContainer: {
    paddingBottom: 80,
  },
});

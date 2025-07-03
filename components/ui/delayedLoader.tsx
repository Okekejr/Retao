import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function DelayedLoader({
  visible,
  delay = 300,
}: {
  visible: boolean;
  delay?: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (visible) {
      timeout = setTimeout(() => setShow(true), delay);
    } else {
      setShow(false);
    }

    return () => clearTimeout(timeout);
  }, [visible, delay]);

  if (!show) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={Colors.light.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.85)", // Adjust for dark/light themes
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
});

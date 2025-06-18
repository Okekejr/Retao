import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const StarRating = ({
  rating,
  onChange,
  maxStars = 5,
  size = 32,
}: {
  rating: number;
  onChange: (val: number) => void;
  maxStars?: number;
  size?: number;
}) => {
  const handlePress = (e: GestureResponderEvent, index: number) => {
    const { locationX } = e.nativeEvent;
    const starWidth = size + 8;
    const isHalf = locationX < starWidth / 2;
    const newRating = isHalf ? index + 0.5 : index + 1;
    onChange(newRating);
  };

  const renderStarIcon = (index: number) => {
    if (rating >= index + 1) return "star";
    if (rating >= index + 0.5) return "star-half";
    return "star-outline";
  };

  return (
    <View style={styles.starContainer}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={(e) => handlePress(e, index)}
        >
          <View>
            <Ionicons
              name={renderStarIcon(index)}
              size={size}
              color={Colors.light.primary}
              style={{ marginHorizontal: 4 }}
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

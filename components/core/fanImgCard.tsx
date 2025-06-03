import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const images = [
  require("../../assets/img/drill.png"),
  require("../../assets/img/projector.png"),
  require("../../assets/img/photo.png"),
];

const screenWidth = Dimensions.get("window").width;

export const FanImageCard = () => {
  const animations = useRef(images.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      100,
      animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {images.map((img, index) => {
        const rotate = `${(index - 1) * 5}deg`; // -5deg, 0deg, 5deg
        const translateX = index * 30; // Adjust spread
        const zIndex = 10 - index;

        return (
          <Animated.Image
            key={index}
            source={img}
            style={[
              styles.image,
              {
                zIndex,
                transform: [
                  { rotate },
                  { translateX },
                  { scale: animations[index] },
                ],
                opacity: animations[index],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 12,
    position: "absolute",
  },
});

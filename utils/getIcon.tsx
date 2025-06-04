import { JSX } from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

export const getIconName = (
  routeName: string,
  focused: boolean
): JSX.Element => {
  const iconStyle: StyleProp<ImageStyle> = {
    width: 24,
    height: 24,
    tintColor: focused ? "#1A1A1A" : "grey",
  };

  switch (routeName) {
    case "home":
      return (
        <Image
          source={require("../assets/icons/Home.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "wishlist":
      return (
        <Image
          source={require("../assets/icons/Heart.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "listings":
      return (
        <Image
          source={require("../assets/icons/appLogo.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "messages":
      return (
        <Image
          source={require("../assets/icons/Message.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    case "profile":
      return (
        <Image
          source={require("../assets/icons/User.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
    default:
      return (
        <Image
          source={require("../assets/icons/Home.png")}
          style={iconStyle}
          resizeMode="contain"
        />
      );
  }
};

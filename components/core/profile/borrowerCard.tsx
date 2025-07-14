import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { avatarsT, profileT } from "@/types";
import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

const avatars: avatarsT = [
  { id: "avatar1", src: require("../../../assets/img/avatar.png") },
  { id: "avatar2", src: require("../../../assets/img/avatar2.png") },
  { id: "avatar3", src: require("../../../assets/img/avatar3.png") },
  { id: "avatar4", src: require("../../../assets/img/avatar4.png") },
];

interface BorrowersCardProps {
  user: profileT;
  onPress: () => void;
}

export const BorrowersCard = ({ user, onPress }: BorrowersCardProps) => {
  const avatar = avatars.find((a) => a.id === user.avatar);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={avatar?.src} style={styles.avatar} />
      <CustomText style={styles.name}>{user.name}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    color: "#333",
  },
});

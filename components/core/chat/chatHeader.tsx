import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { avatarsT } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

interface ChatHeaderProps {
  id: string | undefined;
  name: string | undefined;
  avatar: string | undefined;
}

const avatars: avatarsT = [
  { id: "avatar1", src: require("../../../assets/img/avatar.png") },
  { id: "avatar2", src: require("../../../assets/img/avatar2.png") },
  { id: "avatar3", src: require("../../../assets/img/avatar3.png") },
  { id: "avatar4", src: require("../../../assets/img/avatar4.png") },
];

export const ChatHeader = ({ id, name, avatar }: ChatHeaderProps) => {
  const avatarimg = avatars.find((a) => a.id === avatar);
  const router = useRouter();

  return (
    <Pressable
      style={styles.headerCard}
      onPress={() =>
        router.push({
          pathname: "/userProfile/userProfileCard",
          params: { userId: id },
        })
      }
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginRight: 32 }}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Image
        source={avatarimg?.src}
        placeholder={{ uri: avatars[0].src }}
        contentFit="cover"
        style={styles.imgStyles}
      />

      <CustomText style={styles.text}>{name}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: Colors.light.background,
    paddingTop: 80,
    height: 130,
  },
  imgStyles: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
  },
});

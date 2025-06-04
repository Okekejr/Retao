import CustomText from "@/components/ui/customText";
import { Colors } from "@/constants/Colors";
import { avatarsT } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ChatHeaderProps {
  name: string;
  avatar: string | null;
}

const avatars: avatarsT = [
  { id: "avatar1", src: require("../../../assets/img/avatar.png") },
  { id: "avatar2", src: require("../../../assets/img/avatar2.png") },
];

export const ChatHeader = ({ name, avatar }: ChatHeaderProps) => {
  const avatarimg = avatars.find((a) => a.id === avatar);
  const router = useRouter();

  return (
    <View style={styles.headerCard}>
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
    </View>
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

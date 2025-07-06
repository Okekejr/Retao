import CustomText from "@/components/ui/customText";
import { useUserData } from "@/context/userContext";
import { t } from "@/localization/t";
import { avatarsT, Conversation } from "@/types";
import { formatTimeChat } from "@/utils";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

interface PreviewCardProps {
  item: Conversation;
  onDelete: (id: string) => void;
}

const avatars: avatarsT = [
  { id: "avatar1", src: require("../../../assets/img/avatar.png") },
  { id: "avatar2", src: require("../../../assets/img/avatar2.png") },
];

export const PreviewCard: FC<PreviewCardProps> = ({ item, onDelete }) => {
  const { userData } = useUserData();
  const router = useRouter();

  const userAvatar = avatars.find((a) => a.id === userData.avatar);
  const otherUser = avatars.find((a) => a.id === item.otherUserAvatar);

  const handleMessageOwner = () =>
    router.push({
      pathname: "/message/chatScreen",
      params: { conversationId: item.id, recipientId: item.otherUserId },
    });

  const handleLongPress = () => {
    Alert.alert(
      t("messages.deleteAlert.title"),
      t("messages.deleteAlert.message"),
      [
        { text: t("messages.deleteAlert.cancel"), style: "cancel" },
        {
          text: t("messages.deleteAlert.confirm"),
          style: "destructive",
          onPress: () => onDelete(item.id),
        },
      ]
    );
  };

  return (
    <Animated.View entering={FadeInRight.springify()}>
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: item.unread ? "#F0F8FF" : "#fff" },
        ]}
        onPress={handleMessageOwner}
        onLongPress={handleLongPress}
        delayLongPress={500}
      >
        <View style={styles.avatarContainer}>
          <Image source={otherUser?.src} style={styles.avatar} />
          <Image
            source={userAvatar?.src}
            style={[styles.avatar, styles.overlap]}
          />
        </View>
        <View style={styles.content}>
          <CustomText style={styles.name}>{item.otherUserName}</CustomText>
          <CustomText style={styles.message} numberOfLines={1}>
            {item.lastMessage}
          </CustomText>
        </View>

        {item.unread && <View style={styles.unreadDot} />}

        {item.updatedAt && (
          <CustomText style={styles.timestamp}>
            {formatTimeChat(item.updatedAt)}
          </CustomText>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    flexDirection: "row",
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#ccc",
  },
  overlap: {
    marginLeft: -16,
    zIndex: -1,
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#555",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginLeft: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
    marginLeft: 8,
  },
});

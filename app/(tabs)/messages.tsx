import { PreviewCard } from "@/components/core/chat/previewCard";
import { NotLogged } from "@/components/core/notLogged";
import { GetLoggedInModal } from "@/components/core/notLogged/getLoggedIn";
import { GetSiggnedUp } from "@/components/core/notLogged/getSignedUp";
import { CustomModal } from "@/components/ui/customModal";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import SkeletonConversationsLoader from "@/components/ui/skeletonLoaders/skeletonConversationsLoader";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/context/userContext";
import { useConversations, useDeleteConversation } from "@/hooks/useChat";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function MessagesScreen() {
  const { userData } = useUserData();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedInput, setFocusedInput] = useState<null | "search">(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");

  const bg = themeColor("background");
  const text = themeColor("text");
  const textTertiery = themeColor("textTertiery");

  const {
    data: conversations,
    isLoading,
    refetch: refetchConversations,
  } = useConversations(userData.id);

  const { mutate: deleteConversation } = useDeleteConversation();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetchConversations();
    } catch (error) {
      console.error("Refresh failed", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchConversations]);

  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    return conversations.filter((conv) =>
      conv.otherUserName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, conversations]);

  const openModal = (content: string) => {
    setModalVisible(true);
    setContent(content);
  };

  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    if (userData.id !== "") {
      onRefresh();
    }
  }, [userData.id]);

  if (userData.id && isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
        <InnerContainer style={{ gap: 12, marginTop: 20 }}>
          <Header
            headerTitle={t("messages.title")}
            style={{ marginBottom: 12 }}
          />
          <SkeletonConversationsLoader />
        </InnerContainer>
      </SafeAreaView>
    );
  }

  return (
    <>
      {!userData || userData.id !== "" ? (
        <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
          <InnerContainer style={{ gap: 12, marginTop: 20 }}>
            <Header
              headerTitle={t("messages.title")}
              style={{ marginBottom: 12 }}
            />
            <NotLogged
              title={t("messages.notLoggedIn.title")}
              subTitle={t("messages.notLoggedIn.subTitle")}
              func={() => openModal("Login")}
            />
          </InnerContainer>
          <>
            <CustomModal modalVisible={modalVisible} closeModal={closeModal}>
              {content === "Login" && (
                <GetLoggedInModal closeModal={closeModal} func={openModal} />
              )}
              {content === "Signup" && (
                <GetSiggnedUp closeModal={closeModal} func={openModal} />
              )}
            </CustomModal>
          </>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <InnerContainer style={{ gap: 12, marginTop: 20 }}>
              <Header
                headerTitle={t("messages.title")}
                style={{ marginBottom: 12 }}
              >
                {!searchOpen && userData.id && (
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      borderRadius: 100,
                      backgroundColor: Colors.light.muted,
                    }}
                    onPress={() => setSearchOpen(true)}
                  >
                    <Feather name="search" size={22} color="#333" />
                  </TouchableOpacity>
                )}
              </Header>

              <>
                <AnimatePresence>
                  {searchOpen && (
                    <MotiView
                      from={{ opacity: 0, translateX: 50 }}
                      animate={{ opacity: 1, translateX: 0 }}
                      exit={{ opacity: 0, translateX: 50 }}
                      style={styles.searchContainer}
                    >
                      <View
                        style={[
                          styles.searchInputWrapper,
                          focusedInput === "search" && styles.focusedInput,
                        ]}
                      >
                        <Feather
                          name="search"
                          size={18}
                          color="#000"
                          style={{ marginRight: 8 }}
                        />
                        <TextInput
                          style={styles.searchInput}
                          value={searchQuery}
                          onChangeText={setSearchQuery}
                          placeholder="Search by name"
                          placeholderTextColor={Colors.light.textSecondary}
                          selectionColor="#000"
                          autoFocus
                          autoCorrect={false}
                          onFocus={() => setFocusedInput("search")}
                          onBlur={() => setFocusedInput(null)}
                        />

                        {searchQuery.length > 0 && (
                          <TouchableOpacity
                            onPress={() => setSearchQuery("")}
                            style={[
                              styles.closeButton,
                              { backgroundColor: bg },
                            ]}
                          >
                            <Feather name="x" size={16} color={text} />
                          </TouchableOpacity>
                        )}
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <CustomText style={[styles.backText, { color: text }]}>
                          {t("btnTexts.cancel")}
                        </CustomText>
                      </TouchableOpacity>
                    </MotiView>
                  )}
                </AnimatePresence>

                <View>
                  <FlatList
                    data={filteredConversations}
                    showsVerticalScrollIndicator
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <PreviewCard item={item} onDelete={deleteConversation} />
                    )}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    style={{ paddingBottom: height }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[Colors.light.primary]}
                        tintColor={Colors.light.primary}
                      />
                    }
                    ListEmptyComponent={
                      <View style={styles.emptyState}>
                        <CustomText
                          style={[styles.emptyText, { color: textTertiery }]}
                        >
                          {t("messages.noMsgs")}
                        </CustomText>
                        <CustomText style={styles.emptySubText}>
                          {t("messages.searchMsg")}
                        </CustomText>
                      </View>
                    }
                  />
                </View>
              </>
            </InnerContainer>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "Satoshi-Bold",
  },
  emptySubText: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  animatedSearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.muted,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  backText: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
  },
  closeButton: {
    padding: 4,
    borderRadius: "100%",
  },
});

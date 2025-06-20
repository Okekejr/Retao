import { PreviewCard } from "@/components/core/chat/previewCard";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useConversations } from "@/hooks/useChat";
import { themeColor } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function MessagesScreen() {
  const bg = themeColor("background");
  const text = themeColor("text");
  const textTertiery = themeColor("textTertiery");
  const { data: conversations, isLoading } = useConversations();
  const queryClient = useQueryClient();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedInput, setFocusedInput] = useState<null | "search">(null);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    }, [queryClient])
  );

  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    return conversations.filter((conv) =>
      conv.otherUserName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, conversations]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {isLoading && (
        <View style={[styles.loaderOverlay, { backgroundColor: bg }]}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      )}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <InnerContainer style={{ gap: 12, marginTop: 20 }}>
          <Header headerTitle="Messages" style={{ marginBottom: 12 }}>
            {!searchOpen && (
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
                      style={[styles.closeButton, { backgroundColor: bg }]}
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
                    Cancel
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
              renderItem={({ item }) => <PreviewCard item={item} />}
              contentContainerStyle={{ paddingVertical: 16 }}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <CustomText
                    style={[styles.emptyText, { color: textTertiery }]}
                  >
                    No conversations found
                  </CustomText>
                  <CustomText style={styles.emptySubText}>
                    Try searching by name.
                  </CustomText>
                </View>
              }
            />
          </View>
        </InnerContainer>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
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

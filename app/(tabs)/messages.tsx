import { PreviewCard } from "@/components/core/chat/previewCard";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { useConversations } from "@/hooks/useChat";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";

export default function MessagesScreen() {
  const { data: conversations, isLoading, error } = useConversations();

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer style={{ gap: 12 }}>
        <Header headerTitle="Messages" style={{ marginBottom: 12 }} />

        <View>
          <FlatList
            data={conversations}
            showsVerticalScrollIndicator
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PreviewCard item={item} />}
            contentContainerStyle={{ paddingVertical: 16 }}
            ListEmptyComponent={
              !isLoading ? (
                <View style={styles.emptyState}>
                  <CustomText style={styles.emptyText}>
                    No conversations yet
                  </CustomText>
                  <CustomText style={styles.emptySubText}>
                    Start by messaging an item owner.
                  </CustomText>
                </View>
              ) : null
            }
          />
        </View>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
  },
  emptySubText: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});

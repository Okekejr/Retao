import { HistoryCard } from "@/components/core/profile/historyCard";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h2 } from "@/constants/random";
import { useUserHistory } from "@/hooks/useUserHistory";
import { themeColor } from "@/utils";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function HistoryScreen() {
  const { data: history = [], isLoading } = useUserHistory();
  const bg = themeColor("background");
  const text = themeColor("text");
  const textSec = themeColor("textSecondary");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {isLoading && (
        <View style={[styles.loaderOverlay, { backgroundColor: bg }]}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      )}

      <View style={styles.iconRow}>
        <BackButton style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <InnerContainer style={{ flex: 1, gap: 32 }}>
          <View style={styles.modalHeader}>
            <CustomText style={[h2, { color: text }]}>
              Past Activities
            </CustomText>
          </View>

          <View>
            <FlatList
              data={history}
              keyExtractor={(item) => item.date}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <View style={styles.dateGroup}>
                  <View style={styles.centerWrapper}>
                    <CustomText style={[styles.dateText, { color: textSec }]}>
                      {item.date}
                    </CustomText>
                    <View
                      style={[
                        styles.verticalLine,
                        { backgroundColor: textSec },
                      ]}
                    />
                  </View>

                  <View style={styles.cardsWrapper}>
                    {item.actions.map((entry, index) => (
                      <HistoryCard
                        key={entry.item.id}
                        item={entry.item}
                        index={index}
                        type={entry.type}
                      />
                    ))}
                  </View>
                </View>
              )}
            />
          </View>
        </InnerContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 28,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  modalHeader: {
    marginBottom: 5,
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 10,
  },
  scrollContent: {
    paddingTop: 20,
  },
  listContent: {
    gap: 6,
    paddingBottom: 30,
  },
  dateGroup: {
    marginBottom: 24,
    alignItems: "center",
  },
  centerWrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
    marginBottom: 4,
  },
  verticalLine: {
    width: 2,
    height: 20,
  },
  cardsWrapper: {
    width: "100%",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

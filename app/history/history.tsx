import { HistoryCard } from "@/components/core/profile/historyCard";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { h2 } from "@/constants/random";
import { useUserHistory } from "@/hooks/useUserHistory";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import LottieView from "lottie-react-native";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";

export default function HistoryScreen() {
  const { data: history = [], isLoading } = useUserHistory();
  const bg = themeColor("background");
  const text = themeColor("text");
  const textSec = themeColor("textSecondary");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {isLoading && (
        <View
          style={[
            { flex: 1, justifyContent: "center", alignItems: "center" },
            { backgroundColor: bg },
          ]}
        >
          <Animatable.View animation="bounceIn">
            <LottieView
              source={require("../../assets/loading.json")}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          </Animatable.View>
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
              {t("history.title")}
            </CustomText>
          </View>

          {history && history.length > 0 ? (
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
          ) : (
            <CustomText style={[styles.emptyText, { color: textSec }]}>
              {t("history.noHistory")}
            </CustomText>
          )}
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
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    width: "100%",
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

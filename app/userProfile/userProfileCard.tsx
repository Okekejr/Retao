import { ItemsCard } from "@/components/core/items/itemsCard";
import { IdentityCard } from "@/components/core/profile/identityCard";
import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { h2, h3 } from "@/constants/random";
import { useRecipientProfile } from "@/hooks/useGetUserData";
import { t } from "@/localization/t";
import { themeColor } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function UserProfileCardScreen() {
  const { userId } = useLocalSearchParams();
  const { data: recipient, isLoading } = useRecipientProfile(userId as string);
  const bg = themeColor("background");
  const text = themeColor("text");

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
        <InnerContainer style={{ flex: 1, gap: 16 }}>
          <View style={styles.modalHeader}>
            <CustomText style={[h2, { color: text }]}>Profile Card</CustomText>
          </View>

          <View style={{ gap: 40 }}>
            {recipient && <IdentityCard user={recipient} />}

            {recipient && recipient.listings.length > 0 && (
              <View>
                <CustomText style={[styles.heading, h3, { color: text }]}>
                  {t("listings.title")}
                </CustomText>

                <FlatList
                  data={recipient.listings}
                  keyExtractor={(item) => item.title}
                  scrollEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                  renderItem={({ item }) => (
                    <ItemsCard
                      id={item.id}
                      image={item.image}
                      title={item.title}
                      description={item.description}
                      distance={item.distance}
                      ownerId={recipient.id}
                      subscription_plan={recipient.subscription_plan}
                    />
                  )}
                />
              </View>
            )}

            {recipient && recipient.borrowedItems.length > 0 && (
              <View>
                <CustomText style={[styles.heading, h3, { color: text }]}>
                  {t("listings.borrowedListings")}
                </CustomText>

                <FlatList
                  data={recipient.borrowedItems}
                  keyExtractor={(item) => item.title}
                  scrollEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                  renderItem={({ item }) => (
                    <ItemsCard
                      id={item.id}
                      image={item.image}
                      title={item.title}
                      description={item.description}
                      distance={item.distance}
                      ownerId={recipient.id}
                    />
                  )}
                />
              </View>
            )}
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
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

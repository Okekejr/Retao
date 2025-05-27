import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet } from "react-native";

export default function InboxScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer>
        <Header headerTitle="Inbox" />
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});

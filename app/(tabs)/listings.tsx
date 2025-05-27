import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

export default function ListingsScreen() {
  const router = useRouter();

  const handlePress = () => router.push("/listItems");

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer>
        <Header headerTitle="Listings" style={{ marginBottom: 12 }}>
          <TouchableOpacity style={styles.icon} onPress={handlePress}>
            <CustomText style={styles.buttonText}>List items</CustomText>
            <Ionicons name="add-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Header>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  icon: {
    backgroundColor: Colors.light.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    padding: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

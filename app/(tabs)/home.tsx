import CustomHeading from "@/components/ui/customHeading";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CustomHeading>Home</CustomHeading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  orb: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#000",
    opacity: 0.6,
  },
  logo: {
    width: 120,
    height: 120,
  },
});

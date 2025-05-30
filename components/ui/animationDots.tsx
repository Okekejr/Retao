import { MotiView } from "moti";
import { View } from "react-native";

interface AnimatedDotsProps {
  currentIndex: number;
  total: number;
}

export const AnimatedDots = ({ currentIndex, total }: AnimatedDotsProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 16,
      }}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <MotiView
            key={index}
            from={{
              width: 8,
              opacity: 0.5,
              backgroundColor: "#ccc",
            }}
            animate={{
              width: isActive ? 20 : 8,
              opacity: isActive ? 1 : 0.5,
              backgroundColor: isActive ? "#111" : "#ccc",
            }}
            transition={{
              type: "timing",
              duration: 300,
            }}
            style={{
              height: 8,
              borderRadius: 50,
              marginHorizontal: 5,
            }}
          />
        );
      })}
    </View>
  );
};

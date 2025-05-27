import CustomText from "@/components/ui/customText";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";

const { height, width } = Dimensions.get("window");

interface ItemImagesCarouselProps {
  images: any[] | undefined;
}

export const ItemImagesCarousel = ({ images }: ItemImagesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  );

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={{ position: "relative" }}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} contentFit="cover" />
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      <View style={styles.indicator}>
        <CustomText style={{ color: "#fff", fontSize: 12 }}>
          {currentIndex + 1} / {images?.length}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height / 2.5,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  indicator: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});

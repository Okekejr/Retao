import CustomText from "@/components/ui/customText";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { categories, categoriesT, h3 } from "@/constants/random";
import { useListing } from "@/context/listingContext";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface SelectCategoryProps {
  closeModal: () => void;
}

export default function SelectCategory({ closeModal }: SelectCategoryProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<categoriesT | null>(
    null
  );

  const { updateFormData } = useListing();

  const handleNext = () => {
    updateFormData("category", selectedCategory?.title);
    router.push("/listings/listingIntro");
    closeModal();
  };

  return (
    <InnerContainer>
      <View style={styles.modalHeader}>
        <CustomText style={h3}>What type of item are you listing?</CustomText>
      </View>

      <ScrollView contentContainerStyle={styles.cardList}>
        {categories.map((cat, index) => (
          <MotiView
            key={cat.id}
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              delay: 400 + index * 80,
              type: "timing",
              duration: 400,
            }}
          >
            <TouchableOpacity
              style={[
                styles.categoryCard,
                selectedCategory?.id === cat.id && styles.categoryCardSelected,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <View>
                <CustomText style={styles.categoryTitle}>
                  {cat.title}
                </CustomText>
              </View>
              <Image
                source={cat.icon}
                style={styles.categoryImage}
                contentFit="cover"
              />
            </TouchableOpacity>
          </MotiView>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.primaryButton,
          !selectedCategory && styles.disabledButton,
        ]}
        disabled={!selectedCategory}
        onPress={handleNext}
      >
        <CustomText style={styles.primaryButtonText}>Next</CustomText>
      </TouchableOpacity>
    </InnerContainer>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    paddingVertical: 16,
    alignItems: "center",
  },
  cardList: {
    paddingBottom: 30, // extra space for next button
  },
  categoryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  categoryCardSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.background,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: "Satoshi-Bold",
  },
  categoryImage: {
    width: 60,
    height: 55,
    borderRadius: 12,
  },
  primaryButton: {
    marginBottom: 40,
    backgroundColor: Colors.light.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontFamily: "Satoshi-Bold",
  },
  disabledButton: {
    backgroundColor: Colors.light.muted,
  },
});

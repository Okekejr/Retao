import { Colors } from "@/constants/Colors";
import { h3 } from "@/constants/random";
import { useSearchListings } from "@/hooks/useGetListings";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { FC, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "../ui/customText";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SearchModal: FC<SearchModalProps> = ({ visible, onClose }) => {
  const [submittedQuery, setSubmittedQuery] = useState("");
  const {
    data: results,
    isLoading,
    isError,
  } = useSearchListings(submittedQuery);
  const [search, setSearch] = useState("");
  const modalCardRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    setSubmittedQuery(search.trim());
    Keyboard.dismiss();
  };

  const handleClear = () => {
    setSearch("");
    setSubmittedQuery("");
  };

  const handlePressItem = (id: string) => {
    onClose();
    router.push({ pathname: "/items/[id]", params: { id: id } });
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable
        style={styles.overlay}
        onPress={() => {
          handleClear();
          onClose();
        }}
      >
        <MotiView
          from={{ translateY: -100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: -100, opacity: 0 }}
          transition={{ type: "timing", duration: 300 }}
          style={styles.modalCard}
          ref={modalCardRef}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomText style={h3}>Search Listings</CustomText>

            <TouchableOpacity
              onPress={() => {
                handleClear();
                onClose();
              }}
              style={styles.closeButton}
            >
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.searchContainer, focused && styles.focusedInput]}
          >
            <Feather name="search" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Search for items"
              placeholderTextColor="#999"
              returnKeyType="search"
              selectionColor="#000"
              onSubmitEditing={handleSearch}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoFocus
            />
            {search.length > 0 && (
              <TouchableOpacity
                onPress={handleClear}
                style={styles.clearButton}
              >
                <Feather name="x" size={18} color="#888" />
              </TouchableOpacity>
            )}
          </View>

          {isLoading ? (
            <CustomText style={styles.emptyText}>Loading results...</CustomText>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.resultsContainer}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item, index }) => (
                <MotiView
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: index * 60, type: "timing" }}
                >
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => handlePressItem(item.id)}
                  >
                    <Image
                      source={{ uri: item.images[0] }}
                      style={styles.cardImage}
                    />
                    <View style={styles.cardContent}>
                      <CustomText style={styles.cardTitle}>
                        {item.title}
                      </CustomText>
                      <CustomText
                        style={styles.cardDescription}
                        numberOfLines={2}
                      >
                        {item.description}
                      </CustomText>
                      <CustomText style={styles.cardDistance}>
                        {item.distance}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                </MotiView>
              )}
              ListEmptyComponent={
                !results || results?.length === 0 ? (
                  <View style={styles.emptyState}>
                    <CustomText style={styles.emptyText}>
                      No results yet
                    </CustomText>
                    <CustomText style={styles.emptySubText}>
                      Start by searching for a listing.
                    </CustomText>
                  </View>
                ) : null
              }
            />
          )}
        </MotiView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
  },
  modalCard: {
    backgroundColor: Colors.light.surfaceArea,
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
    marginTop: 120,
  },
  closeButton: {
    padding: 4,
    marginBottom: 8,
    borderRadius: "100%",
    backgroundColor: Colors.light.muted,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#333",
  },
  focusedInput: {
    borderColor: "#000",
    borderWidth: 2,
  },
  icon: {
    marginRight: 8,
  },
  clearButton: {
    paddingLeft: 8,
  },
  resultsContainer: {
    paddingBottom: 80,
  },
  card: {
    flexDirection: "row",
    marginTop: 16,
    backgroundColor: "#FAFAF5",
    borderRadius: 12,
    padding: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
  cardDistance: {
    fontSize: 12,
    color: "#999",
  },
  cardDescription: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    width: "100%",
  },
  emptySubText: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});

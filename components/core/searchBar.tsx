import { Feather } from "@expo/vector-icons";
import { FC, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState("");

  const handleClear = () => {
    setQuery("");
    onSearch && onSearch("");
  };

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch && onSearch(text);
  };

  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#888" style={styles.icon} />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={handleChange}
        returnKeyType="search"
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      {query.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Feather name="x" size={18} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FAFAF5",
    borderWidth: 1,
    borderColor: "#c7c7c7",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3, // Android shadow
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1A1A1A",
    fontFamily: "Inter-Regular",
  },
  clearButton: {
    padding: 4,
  },
});

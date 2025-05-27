import { BackButton } from "@/components/ui/backButton";
import CustomText from "@/components/ui/customText";
import { Header } from "@/components/ui/header";
import { InnerContainer } from "@/components/ui/innerContainer";
import { Colors } from "@/constants/Colors";
import { categories } from "@/constants/random";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { z } from "zod";

const itemSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  category: z.string(),
  available: z.boolean(),
});

type ItemForm = z.infer<typeof itemSchema>;

export default function ListItemsScreen() {
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemForm>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      available: true,
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      selectionLimit: 3,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selected = result.assets.map((asset) => asset.uri);
      // Limit to 3 images
      setImages((prev) => {
        const combined = [...prev, ...selected].slice(0, 3);
        return combined;
      });
    }
  };

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location access is required.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const reverse = await Location.reverseGeocodeAsync(loc.coords);
    const name =
      reverse[0]?.city || `${loc.coords.latitude}, ${loc.coords.longitude}`;
    setLocation(name);
  };

  const onSubmit = (data: ItemForm) => {
    const payload = {
      ...data,
      images,
      location,
    };
    console.log("Form submitted:", payload);
  };

  return (
    <SafeAreaView style={styles.container}>
      <InnerContainer>
        <Header headerTitle="List an Item" style={{ marginBottom: 20 }}>
          <BackButton iconName="close" />
        </Header>

        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Item title"
              value={field.value}
              onChangeText={field.onChange}
              style={styles.input}
            />
          )}
        />
        {errors.title && (
          <CustomText style={styles.error}>Title is required</CustomText>
        )}

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Description"
              multiline
              numberOfLines={3}
              value={field.value}
              onChangeText={field.onChange}
              style={[styles.input, styles.textarea]}
            />
          )}
        />
        {errors.description && (
          <CustomText style={styles.error}>Description too short</CustomText>
        )}

        {/* Category Dropdown */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
                placeholder={{ label: "Select category", value: "" }}
                items={categories.map((cat) => ({
                  label: cat.title,
                  value: cat.title,
                }))}
                style={{
                  inputIOS: styles.pickerInput,
                  inputAndroid: styles.pickerInput,
                }}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          )}
        />
        {errors.category && (
          <CustomText style={styles.error}>Please select a category</CustomText>
        )}

        {/* Available Toggle */}
        <View style={styles.row}>
          <CustomText>Available:</CustomText>
          <Controller
            name="available"
            control={control}
            render={({ field }) => (
              <Switch value={field.value} onValueChange={field.onChange} />
            )}
          />
        </View>

        {/* Image Picker */}
        <View style={styles.imagePreviewContainer}>
          {images.length > 0 ? (
            images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.imagePreview} />
            ))
          ) : (
            <CustomText>Select Image</CustomText>
          )}
        </View>

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <CustomText>
            {images.length > 0 ? "Add More" : "Select Images"}
          </CustomText>
        </TouchableOpacity>

        {/* Location Picker */}
        <TouchableOpacity onPress={fetchLocation} style={styles.locationBox}>
          <CustomText>
            {location ? `📍 ${location}` : "Detect Location"}
          </CustomText>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSubmit(onSubmit)}
        >
          <CustomText style={styles.primaryButtonText}>Submit Item</CustomText>
        </TouchableOpacity>
      </InnerContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
    backgroundColor: Colors.light.background,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  imagePicker: {
    height: 150,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  locationBox: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  pickerInput: {
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: Colors.light.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

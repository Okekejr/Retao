import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

interface ThemeContextType {
  theme: "light" | "dark";
  colorMode: "light" | "dark" | "system";
  setColorMode: (mode: "light" | "dark" | "system") => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colorMode: "system",
  setColorMode: async () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<"light" | "dark" | "system">(
    "system"
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Get system theme on load
  const getSystemTheme = () => Appearance.getColorScheme() ?? "light";

  useEffect(() => {
    const loadColorMode = async () => {
      const saved = await AsyncStorage.getItem("colorMode");
      const initialMode = (saved as "light" | "dark" | "system") ?? "system";
      setColorMode(initialMode);
    };
    loadColorMode();
  }, []);

  // Apply theme whenever colorMode or system preference changes
  useEffect(() => {
    const applyTheme = () => {
      if (colorMode === "system") {
        const system = Appearance.getColorScheme() ?? "light";
        setTheme(system);
      } else {
        setTheme(colorMode);
      }
    };

    applyTheme(); // Run on mount

    const subscription = Appearance.addChangeListener(() => {
      if (colorMode === "system") applyTheme();
    });

    return () => subscription.remove();
  }, [colorMode]);

  const handleSetColorMode = async (mode: "light" | "dark" | "system") => {
    await AsyncStorage.setItem("colorMode", mode);
    setColorMode(mode);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, colorMode, setColorMode: handleSetColorMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

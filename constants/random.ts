export const h2 = {
  fontFamily: "Satoshi-Bold",
  fontSize: 24,
  letterSpacing: 0.4,
  color: "#1A1A1A",
};

export const h3 = {
  fontFamily: "Satoshi-Bold",
  fontSize: 18,
  letterSpacing: 0.3,
  color: "#1A1A1A",
};

const isDev = process.env.NODE_ENV !== "production";

// Use EXPO_PUBLIC_MACHINE_IP for local dev
const machineIP = process.env.EXPO_PUBLIC_MACHINE_IP || "localhost";

export const BASE_URL = isDev
  ? `http://${machineIP}:3000/api/`
  : "https://retaobackend-production.up.railway.app/api/";

export const WS_URL = isDev
  ? `ws://${machineIP}:3000`
  : "wss://retaobackend-production.up.railway.app";

export const AppName = "Retao";

export type UserRole = "owner" | "borrower" | "viewer";

export type ItemStatus = "listed" | "borrowed";

export type categoriesT = {
  id: string;
  icon: any;
}[];

export const categoriesIcon: categoriesT = [
  {
    id: "tools",
    icon: require("../assets/img/cat/tools.png"),
  },
  {
    id: "camping",
    icon: require("../assets/img/cat/camping.png"),
  },
  {
    id: "camera",
    icon: require("../assets/img/cat/photograph.png"),
  },
  {
    id: "gardening",
    icon: require("../assets/img/cat/gardening.png"),
  },
  {
    id: "furniture",
    icon: require("../assets/img/cat/furniture.png"),
  },
];

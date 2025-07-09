import { SubscriptionIosPeriod } from "react-native-iap";

interface WordsT {
  text: string;
  wordsNum: number;
}

export const isMoreThanDashWords = ({ text, wordsNum }: WordsT) => {
  return text.trim().split(/\s+/).length > wordsNum;
};

export const formatDate = (item: string) =>
  new Date(item).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatTime = (item: string) =>
  new Date(item).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

export const toLocalISOString = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}`
  );
};

export const formatTimeChat = (isoDate: string) => {
  if (isoDate === null) return;
  const date = new Date(isoDate);
  const now = new Date();
  const diff = Math.floor((+now - +date) / 1000 / 60); // minutes

  if (diff < 1) return "Now";
  if (diff < 60) return `${diff}m ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const formatSubscriptionPeriod = (
  period?: SubscriptionIosPeriod | null
): string => {
  switch (period) {
    case "DAY":
      return "Billed daily";
    case "WEEK":
      return "Billed weekly";
    case "MONTH":
      return "Billed monthly";
    case "YEAR":
      return "Billed annually";
    default:
      return "Subscription";
  }
};

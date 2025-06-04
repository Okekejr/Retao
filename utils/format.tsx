interface WordsT {
  text: string;
  wordsNum: number;
}

export const isMoreThanDashWords = ({ text, wordsNum }: WordsT) => {
  return text.trim().split(/\s+/).length > wordsNum;
};

export const formatDate = (item: string) => new Date(item).toLocaleDateString();

export const formatTime = (item: string) =>
  new Date(item).toLocaleTimeString("en-US");

export const formatTimeChat = (isoDate: string) => {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = Math.floor((+now - +date) / 1000 / 60); // minutes

  if (diff < 1) return "Now";
  if (diff < 60) return `${diff}m ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

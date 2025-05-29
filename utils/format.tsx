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

interface WordsT {
  text: string;
  wordsNum: number;
}

export const isMoreThanDashWords = ({ text, wordsNum }: WordsT) => {
  return text.trim().split(/\s+/).length > wordsNum;
};

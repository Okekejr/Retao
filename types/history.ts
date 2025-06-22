export type HistoryItemType = "listed" | "borrowed" | "returned";

export interface HistoryItem {
  type: HistoryItemType;
  item: {
    id: string;
    images: string[];
    title: string;
    description: string;
    distance: string;
  };
}

export interface HistoryEntry {
  date: string;
  actions: HistoryItem[];
}

export type UserHistoryResponse = HistoryEntry[];

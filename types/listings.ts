export type ItemStatus = "listed" | "borrowed";

export type ListingsT = {
  id: string;
  image: any[];
  title: string;
  description: string;
  distance: string;
  availability: string;
  favorited: boolean;
  category: string;
  status?: ItemStatus;
  owner: {
    id: string;
    name: string;
    avatar: any;
    contact: string;
  };
  borrower?: {
    id: string;
    name: string;
    contact: string;
    borrowedOn?: string;
    dueDate?: string;
  };
}[];

export type Listing = {
  id: string;
  image: any[];
  title: string;
  description: string;
  distance: string;
  availability: string;
  favorited: boolean;
  category: string;
  status?: ItemStatus;
  owner: {
    id: string;
    name: string;
    avatar: any;
    contact: string;
  };
  borrower?: {
    id: string;
    name: string;
    contact: string;
    borrowedOn?: string;
    dueDate?: string;
  };
};

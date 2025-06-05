export type BorrowRequest = {
  id: string;
  item_id: string;
  owner_id: string;
  borrower_id: string;
  status: "pending" | "accepted" | "rejected";
  due_date: string | null;
  created_at: string;
  updated_at: string;
  borrower_name: string;
  borrower_contact: string;
  item_title: string;
};

export type BorrowRequestsResponse = {
  data: BorrowRequest[];
};

export type Decision = {
  requestId: string;
  status: "accepted" | "rejected";
};

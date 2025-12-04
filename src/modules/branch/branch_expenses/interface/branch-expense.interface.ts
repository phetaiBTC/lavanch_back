export interface BranchExpenseProps {
  id?: number;
  expense_no: string;
  branch_id: number;
  expense_category_id: number;
  amount: number;
  currency_id?: number;
  expense_date: Date;
  description?: string;
  notes?: string;
  receipt_image?: string;
  created_by: number;
  approved_by?: number;
  status?: string;
  wallet_transaction_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  // Relations (optional for mapping)
  branch?: { id: number; name: string };
  expense_category?: { id: number; name: string };
}

export interface BranchExpenseResponse {
  id: number;
  expense_no: string;
  branch_id: number;
  expense_category_id: number;
  amount: number;
  currency_id: number;
  expense_date: string;
  description: string | null;
  notes: string | null;
  receipt_image: string | null;
  created_by: number;
  approved_by: number | null;
  status: string;
  wallet_transaction_id: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  // Relations
  branch?: { id: number; name: string };
  expense_category?: { id: number; name: string };
}

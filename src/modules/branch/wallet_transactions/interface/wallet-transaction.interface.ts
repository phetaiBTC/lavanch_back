export interface WalletTransactionProps {
  id?: number;
  branch_id: number;
  transaction_type: string;
  amount: number;
  balance_before: number;
  balance_after: number;
  reference_type?: string;
  reference_id?: number;
  reference_no?: string;
  related_branch_id?: number;
  related_transaction_id?: number;
  description?: string;
  notes?: string;
  created_by: number;
  approved_by?: number;
  status?: string;
  transaction_date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface WalletTransactionResponse {
  id: number;
  branch_id: number;
  transaction_type: string;
  amount: number;
  balance_before: number;
  balance_after: number;
  reference_type: string | null;
  reference_id: number | null;
  reference_no: string | null;
  related_branch_id: number | null;
  related_transaction_id: number | null;
  description: string | null;
  notes: string | null;
  created_by: number;
  approved_by: number | null;
  status: string;
  transaction_date: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

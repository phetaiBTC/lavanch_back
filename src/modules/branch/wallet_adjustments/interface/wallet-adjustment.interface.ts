export interface WalletAdjustmentProps {
  id?: number;
  adjustment_no: string;
  branch_id: number;
  adjustment_type: string;
  amount: number;
  reason: string;
  description?: string;
  created_by: number;
  approved_by?: number;
  status?: string;
  wallet_transaction_id?: number;
  adjustment_date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface WalletAdjustmentResponse {
  id: number;
  adjustment_no: string;
  branch_id: number;
  adjustment_type: string;
  amount: number;
  reason: string;
  description: string | null;
  created_by: number;
  approved_by: number | null;
  status: string;
  wallet_transaction_id: number | null;
  adjustment_date: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

import { Village } from 'src/modules/address/domain/address.entity';

export interface BranchProps {
  id?: number;
  name: string;
  address?: string;
  village_id?: number;
  village?: Village;
  phone?: string;
  facebook?: string;
  tiktok?: string;
  shifts_id?: number;
  is_active?: boolean;
  wallet_balance?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface BranchResponse {
  id: number;
  name: string;
  address: string | null;
  village_id: number | null;
  village: Village | null;
  phone: string | null;
  facebook: string | null;
  tiktok: string | null;
  shifts_id: number | null;
  is_active: boolean;
  wallet_balance: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BranchWalletBalance {
  branch_id: number;
  branch_name: string;
  wallet_balance: number;
}

export interface BranchSummaryResponse {
  total_wallet_balance_per_branch: BranchWalletBalance[];
  total_wallet_balance_all_branches: number;
  active_count: number;
  inactive_count: number;
}

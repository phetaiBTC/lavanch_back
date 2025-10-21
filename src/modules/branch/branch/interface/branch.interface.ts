export interface BranchProps {
  id?: number;
  name: string;
  address?: string;
  village_id?: number;
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

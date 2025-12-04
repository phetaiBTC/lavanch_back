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
  village?: {
    id: number;
    name: string;
    name_en: string;
    district: {
      id: number;
      name: string;
      name_en: string;
      province: {
        id: number;
        name: string;
        name_en: string;
      };
    };
  };
  /**
   * Flattened address helper object for easier frontend rendering
   * Contains raw name (english if available, else default) for village, district, province
   */
  full_address?: {
    village_name: string | null;
    district_name: string | null;
    province_name: string | null;
  };
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

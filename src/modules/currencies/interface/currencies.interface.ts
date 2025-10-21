export interface CurrenciesProps {
  id?: number;
  code: string;
  name: string;
  symbol: string;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export interface CurrenciesResponse {
  id: number;
  code: string;
  name: string;
  symbol: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

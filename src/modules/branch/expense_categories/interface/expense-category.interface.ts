export interface ExpenseCategoryProps {
  id?: number;
  name: string;
  code?: string;
  description?: string;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ExpenseCategoryResponse {
  id: number;
  name: string;
  code: string | null;
  description: string | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

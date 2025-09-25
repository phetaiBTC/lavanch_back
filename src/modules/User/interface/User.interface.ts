export interface UserProps {
  id?: number | null;
  username: string;
  email: string;
  password: string;
  is_verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

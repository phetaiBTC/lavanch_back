// Province
export interface ImageProps {
  id?: number;
  url: string;
  key: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export interface ImageResponse {
  id: number;
  url: string;
  key: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

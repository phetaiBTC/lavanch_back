export interface ShardInterfaceProps {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ShardInterfaceResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

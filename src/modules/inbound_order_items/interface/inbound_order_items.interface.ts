export interface Inbound_order_itemsProps {
  id?: number | null;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface Inbound_order_itemsResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}  

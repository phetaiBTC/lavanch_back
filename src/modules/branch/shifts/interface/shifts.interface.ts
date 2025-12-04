export interface ShiftsProps {
  id?: number;
  start_time: string;
  end_time: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ShiftsResponse {
  id: number;
  start_time: string;
  end_time: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

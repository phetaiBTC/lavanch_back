export interface SupplierProps {
  id?: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  is_active: boolean;
  contact_person: string;
  vaillage_id?: number;
}

export interface SupplierResponse {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  is_active: boolean;
  contact_person: string;
  vaillage_id?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

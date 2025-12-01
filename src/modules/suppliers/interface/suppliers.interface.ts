import { Village } from 'src/modules/address/domain/address.entity';
import { VillageResponse } from 'src/modules/address/interface/address.interface';
import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/BaseModule/interface/Base.interface';
export interface SuppliersProps extends ShardInterfaceProps {
  name: string;
  email: string;
  phone: string;
  contact_person: string;
  address: string;
  is_active: boolean;
  village?: Village;
}

export interface SuppliersResponse extends ShardInterfaceResponse {
  name: string;
  email: string;
  phone: string;
  contact_person: string;
  address: string;
  is_active: boolean;
  village?: VillageResponse;
}

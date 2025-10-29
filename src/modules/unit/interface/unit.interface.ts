import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface UnitProps extends ShardInterfaceProps {
  name: string;
  name_en?: string;
  abbreviation?: string;
  is_active: boolean;
}
export interface UnitResponse extends ShardInterfaceResponse {
  name: string;
  name_en?: string;
  abbreviation?: string;
  is_active: boolean;
}

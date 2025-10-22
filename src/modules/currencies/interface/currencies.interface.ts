import {
  ShardInterfaceResponse,
  ShardInterfaceProps,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface CurrenciesProps extends ShardInterfaceProps {
  code: string;
  name: string;
  symbol: string;
  is_active?: boolean;
}
export interface CurrenciesResponse extends ShardInterfaceResponse {
  code: string;
  name: string;
  symbol: string;
  is_active: boolean;
}

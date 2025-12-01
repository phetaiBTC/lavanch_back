import { ShardInterfaceResponse } from 'src/shared/BaseModule/interface/Base.interface';

export interface MemberTierResponse extends ShardInterfaceResponse {
  name: string;
  min_spending: number;
  discount_percent: number;
  points_multiplier: number;
  is_active: boolean;
}

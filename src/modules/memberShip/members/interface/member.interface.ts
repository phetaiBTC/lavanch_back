import { ShardInterfaceResponse } from 'src/shared/BaseModule/interface/Base.interface';

export interface MemberResponse extends ShardInterfaceResponse {
  member_no: string;
  name: string;
  phone: string;
  email?: string;
  birthday?: string;
  gender?: string;
  tier_id?: number;
  total_spending: number;
  registered_branch_id?: number;
}

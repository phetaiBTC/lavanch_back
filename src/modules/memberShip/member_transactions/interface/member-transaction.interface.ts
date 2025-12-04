import { ShardInterfaceResponse } from 'src/shared/BaseModule/interface/Base.interface';

export interface MemberTransactionResponse extends ShardInterfaceResponse {
  member_id: number;
  branch_id: number;
  sale_id?: number;
  type: string;
  total_amount: number;
  points_earned: number;
  points_redeemed: number;
  points_balance: number;
  date: string;
  notes?: string;
}

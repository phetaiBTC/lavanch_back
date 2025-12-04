import { ShardInterfaceResponse } from 'src/shared/BaseModule/interface/Base.interface';

export interface MemberPointResponse extends ShardInterfaceResponse {
  member_id: number;
  branch_id: number;
  points: number;
}

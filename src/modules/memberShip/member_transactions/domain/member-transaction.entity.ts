import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ShardInterfaceProps } from 'src/shared/BaseModule/interface/Base.interface';

export interface MemberTransactionProps extends ShardInterfaceProps {
  member_id: number;
  branch_id: number;
  sale_id?: number;
  type: string; // EARN, REDEEM, REFUND, ADJUSTMENT
  total_amount: number;
  points_earned: number;
  points_redeemed: number;
  points_balance: number;
  date: Date;
  notes?: string;
}

export class MemberTransaction extends ShardEntity<MemberTransactionProps> {
  get value(): MemberTransactionProps {
    return {
      id: this['id'],
      member_id: this['member_id'],
      branch_id: this['branch_id'],
      sale_id: this['sale_id'],
      type: this['type'],
      total_amount: this['total_amount'],
      points_earned: this['points_earned'],
      points_redeemed: this['points_redeemed'],
      points_balance: this['points_balance'],
      date: this['date'],
      notes: this['notes'],
      createdAt: this['createdAt'],
      updatedAt: this['updatedAt'],
      deletedAt: this['deletedAt'],
    };
  }

  constructor(props: Partial<MemberTransactionProps>) {
    super(props);
    Object.assign(this, props);
  }
}

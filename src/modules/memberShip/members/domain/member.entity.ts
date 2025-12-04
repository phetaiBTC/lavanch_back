import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ShardInterfaceProps } from 'src/shared/BaseModule/interface/Base.interface';

export interface MemberProps extends ShardInterfaceProps {
  member_no: string;
  name: string;
  phone: string;
  email?: string;
  birthday?: Date;
  gender?: string;
  tier_id?: number;
  total_spending: number;
  registered_branch_id?: number;
}

export class Member extends ShardEntity<MemberProps> {
  get value(): MemberProps {
    return {
      id: this['id'],
      member_no: this['member_no'],
      name: this['name'],
      phone: this['phone'],
      email: this['email'],
      birthday: this['birthday'],
      gender: this['gender'],
      tier_id: this['tier_id'],
      total_spending: this['total_spending'],
      registered_branch_id: this['registered_branch_id'],
      createdAt: this['createdAt'],
      updatedAt: this['updatedAt'],
      deletedAt: this['deletedAt'],
    };
  }

  constructor(props: Partial<MemberProps>) {
    super(props);
    Object.assign(this, props);
  }
}

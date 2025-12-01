import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ShardInterfaceProps } from 'src/shared/BaseModule/interface/Base.interface';

export interface MemberPointProps extends ShardInterfaceProps {
  member_id: number;
  branch_id: number;
  points: number;
}

export class MemberPoint extends ShardEntity<MemberPointProps> {
  get value(): MemberPointProps {
    return {
      id: this['id'],
      member_id: this['member_id'],
      branch_id: this['branch_id'],
      points: this['points'],
      createdAt: this['createdAt'],
      updatedAt: this['updatedAt'],
      deletedAt: this['deletedAt'],
    };
  }

  constructor(props: Partial<MemberPointProps>) {
    super(props);
    Object.assign(this, props);
  }
}

import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { ShardInterfaceProps } from 'src/shared/BaseModule/interface/Base.interface';

export interface MemberTierProps extends ShardInterfaceProps {
  name: string;
  min_spending: number;
  discount_percent: number;
  points_multiplier: number;
  is_active: boolean;
}

export class MemberTier extends ShardEntity<MemberTierProps> {
  get value(): MemberTierProps {
    return {
      id: this['id'],
      name: this['name'],
      min_spending: this['min_spending'],
      discount_percent: this['discount_percent'],
      points_multiplier: this['points_multiplier'],
      is_active: this['is_active'],
      createdAt: this['createdAt'],
      updatedAt: this['updatedAt'],
      deletedAt: this['deletedAt'],
    };
  }

  constructor(props: Partial<MemberTierProps>) {
    super(props);
    Object.assign(this, props);
  }
}

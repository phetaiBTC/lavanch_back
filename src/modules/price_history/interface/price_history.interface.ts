import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { ProductVariantResponse } from 'src/modules/product_variant/interface/product_variant.interface';
import { Unit } from 'src/modules/unit/domain/unit.entity';
import { UnitResponse } from 'src/modules/unit/interface/unit.interface';
import { User } from 'src/modules/user/domain/user.entity';
import { UserResponse } from 'src/modules/user/interface/user.interface';
import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface PriceHistoryProps extends ShardInterfaceProps {
  product_variant: ProductVariant | null;
  unit: Unit | null;
  old_cost_price?: number;
  new_cost_price?: number;
  old_selling_price?: number;
  new_selling_price?: number;
  changed_by: User | null;
  change_date?: Date;
  reason?: string;
}

export interface PriceHistoryResponse extends ShardInterfaceResponse {
  product_variant: ProductVariantResponse | null;
  unit: UnitResponse | null;
  old_cost_price?: number;
  new_cost_price?: number;
  old_selling_price?: number;
  new_selling_price?: number;
  changed_by: UserResponse | null;
  reason?: string;
  change_date: Date;
}

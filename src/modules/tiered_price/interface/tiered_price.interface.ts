import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { ProductVariantResponse } from 'src/modules/product_variant/interface/product_variant.interface';
import { Unit } from 'src/modules/unit/domain/unit.entity';
import { UnitResponse } from 'src/modules/unit/interface/unit.interface';
import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface TieredPriceProps extends ShardInterfaceProps {
  product_variant: ProductVariant;
  unit: Unit;
  min_quantity: number;
  max_quantity?: number;
  price_per_unit: number;
  is_active?: boolean;
}
export interface TieredPriceResponse extends ShardInterfaceResponse {
  product_variant: ProductVariantResponse | null;
  unit: UnitResponse | null;
  min_quantity: number;
  max_quantity?: number;
  price_per_unit: number;
  is_active?: boolean;
}

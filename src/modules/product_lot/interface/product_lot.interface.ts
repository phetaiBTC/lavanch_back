import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { ProductVariantResponse } from 'src/modules/product_variant/interface/product_variant.interface';
import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/interface/Base.interface';

export interface ProductLotProps extends ShardInterfaceProps {
  product_variant: ProductVariant;
  lot_number: string;
  manufacture_date?: Date;
  expiry_date?: Date;
//   branch: Branch;     
  quantity: number;
  cost_price_local: number;
//   cost_currency: Currency; 
  cost_price_original: number;
  fx_rate: number;
}
export interface ProductLotResponse extends ShardInterfaceResponse {
  product_variant: ProductVariantResponse | null;
  lot_number: string;
  manufacture_date?: Date;
  expiry_date?: Date;
//   branch: Branch;
// branch: Branch;
  quantity: number;
  cost_price_local: number;
//   cost_currency: Currency;
  cost_price_original: number;
  fx_rate: number;
}

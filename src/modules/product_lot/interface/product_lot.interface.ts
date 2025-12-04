import { Currencies } from 'src/modules/currencies/domain/currencies.entity';
import { CurrenciesResponse } from 'src/modules/currencies/interface/currencies.interface';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { ProductVariantResponse } from 'src/modules/product_variant/interface/product_variant.interface';
import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface ProductLotProps extends ShardInterfaceProps {
  product_variant: ProductVariant;
  lot_number: string;
  manufacture_date?: Date;
  expiry_date?: Date;
  quantity: number;
  cost_price_local: number;
  cost_currency: Currencies | null;
  cost_price_original: number;
  fx_rate: number;
}
export interface ProductLotResponse extends ShardInterfaceResponse {
  product_variant: ProductVariantResponse | null;
  lot_number: string;
  manufacture_date?: Date;
  expiry_date?: Date;
  quantity: number;
  cost_price_local: number;
  cost_currency: CurrenciesResponse | null;
  cost_price_original: number;
  fx_rate: number;
}

import { Currencies } from 'src/modules/currencies/domain/currencies.entity';
import { CurrenciesResponse } from 'src/modules/currencies/interface/currencies.interface';
import {
  ShardInterfaceResponse,
  ShardInterfaceProps,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface CurrencyRatesProps extends ShardInterfaceProps {
  from_currency_id: Currencies;
  to_currency_id: Currencies;
  rate: number;
  rate_date: Date;
}
export interface CurrencyRatesResponse extends ShardInterfaceResponse {
  from_currency_id: CurrenciesResponse;
  to_currency_id: CurrenciesResponse;
  rate: number;
  rate_date: string;
}

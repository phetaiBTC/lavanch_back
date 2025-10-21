import { Currencies } from 'src/modules/currencies/domain/currencies.entity';

export interface CurrencyRatesProps {
  id?: number | null;
  from_currency_id: Currencies;
  to_currency_id: Currencies;
  rate: number;
  rate_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export interface CurrencyRatesResponse {
  id: number;
  from_currency_id: Currencies;
  to_currency_id: Currencies;
  rate: number;
  rate_date: Date;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

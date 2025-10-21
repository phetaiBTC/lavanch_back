import { Currencies } from 'src/modules/currencies/domain/currencies.entity';
import { CurrencyRatesProps } from '../interface/currencyrates.interface';
export class CurrencyRates {
  private id: number | null;
  private from_currency_id: Currencies;
  private to_currency_id: Currencies;
  private rate: number;
  private rate_date: Date;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;
  constructor(props: CurrencyRatesProps) {
    this.id = props.id ?? null;
    this.from_currency_id = props.from_currency_id;
    this.to_currency_id = props.to_currency_id;
    this.rate = props.rate;
    this.rate_date = props.rate_date;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }
  get value() {
    return {
      id: this.id,
      from_currency_id: this.from_currency_id,
      to_currency_id: this.to_currency_id,
      rate: this.rate,
      rate_date: this.rate_date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  update(props: Partial<CurrencyRatesProps>): CurrencyRates {
    return new CurrencyRates({
      ...this.value,
      ...props,
      updatedAt: new Date(),
    });
  }
}

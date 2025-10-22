import { Currencies } from 'src/modules/currencies/domain/currencies.entity';
import { CurrencyRatesProps } from '../interface/currencyrates.interface';
import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';

export class CurrencyRates extends ShardEntity<CurrencyRatesProps> {
  private from_currency_id: Currencies;
  private to_currency_id: Currencies;
  private rate: number;
  private rate_date: Date;

  constructor(props: CurrencyRatesProps) {
    super(props);
    this.from_currency_id = props.from_currency_id;
    this.to_currency_id = props.to_currency_id;
    this.rate = props.rate;
    this.rate_date = props.rate_date;
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

  update(
    props: Partial<
      Omit<CurrencyRatesProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new CurrencyRates({
      ...this.value,
      ...props,
      updatedAt: new Date(),
    });
  }
}

import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { CurrenciesOrm } from './currencies.orm-entity';
@Entity('currency_rates')
export class CurrencyRatesOrm extends ShardOrm {
  @ManyToOne(() => CurrenciesOrm, (currency) => currency.from_currency_id, {
    nullable: false,
  })
  from_currency_id: CurrenciesOrm;
  @ManyToOne(() => CurrenciesOrm, (currency) => currency.to_currency_id, {
    nullable: false,
  })
  to_currency_id: CurrenciesOrm;
  @Column({ nullable: false })
  rate: number;
  @Column({ nullable: false })
  rate_date: Date;
}

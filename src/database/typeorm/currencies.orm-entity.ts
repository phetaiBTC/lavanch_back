import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { CurrencyRatesOrm } from './currencyRates.orm-entity';
import { Inbound_ordersOrm } from './inbound_orders.orm-entity';
@Entity('currencies')
export class CurrenciesOrm extends ShardOrm {
  @Column({ unique: true, nullable: false })
  code: string;
  @Column({ nullable: false })
  name: string;
  @Column()
  symbol: string;
  @Column({ default: true })
  is_active: boolean;
  @OneToMany(
    () => CurrencyRatesOrm,
    (currencyRate) => currencyRate.to_currency_id,
  )
  to_currency_id: CurrencyRatesOrm[];
  @OneToMany(
    () => CurrencyRatesOrm,
    (currencyRate) => currencyRate.from_currency_id,
  )
  from_currency_id: CurrencyRatesOrm[];

  @OneToMany(
    () => Inbound_ordersOrm,
    (inbound_orders) => inbound_orders.currency,
  )
  inbound_orders: Inbound_ordersOrm[];
}

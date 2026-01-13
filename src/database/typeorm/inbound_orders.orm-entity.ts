import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { SuppliersOrm } from './suppliers.orm-entity';
import { BranchesOrm } from './branches.orm-entity';
import { CurrenciesOrm } from './currencies.orm-entity';
import { UserOrm } from './user.orm-entity';
import { Inbound_order_itemsOrm } from './inbound_order_items.orm-entity';

export enum InboundOrdersStatus {
  PENDING = 'PENDING',
  RECEIVED = 'RECEIVED',
  PARTIAL = 'PARTIAL',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',

}

@Entity('inbound_orders')
export class Inbound_ordersOrm extends ShardOrm {
  @ManyToOne(() => SuppliersOrm, (suppliers) => suppliers.inbound_orders)
  supplier: SuppliersOrm;

  @ManyToOne(() => BranchesOrm, (branches) => branches.inbound_orders)
  branch: BranchesOrm;

  @Column()
  order_date: Date;

  @Column()
  expected_date: Date;

  @Column({ nullable: true })
  received_date: Date;

  @ManyToOne(() => CurrenciesOrm, (currency) => currency.inbound_orders)
  currency: CurrenciesOrm;

  @Column()
  total_amount: number;

  @Column({
    type: 'enum',
    enum: InboundOrdersStatus,
    default: InboundOrdersStatus.PENDING,
  })
  status: InboundOrdersStatus;

  @ManyToOne(() => UserOrm, (user) => user.inbound_orders)
  created_by: UserOrm;

  @OneToMany(
    () => Inbound_order_itemsOrm,
    (inbound_order_items) => inbound_order_items.inbound_orders,
  )
  inbound_order_items: Inbound_order_itemsOrm[];
}

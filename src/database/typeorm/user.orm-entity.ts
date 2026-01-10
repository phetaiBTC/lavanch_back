import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { PermissionOrm } from './permission.orm-entity';
import { RoleOrm } from './role.orm-entity';
import { Stock_transfersOrm } from './stock_transfers.orm-entity';
import { Stock_movementsOrm } from './stock_movements.orm-entity';
import { Inbound_ordersOrm } from './inbound_orders.orm-entity';
import { Stock_adjustmentsOrm } from './stock_adjustments.orm-entity';
@Entity('user')
export class UserOrm extends ShardOrm {
  @Column() username: string;
  @Column({ unique: true }) email: string;
  @Column()
  password: string;
  @Column({ default: false })
  is_verified: boolean;
  @ManyToMany(() => RoleOrm, (role) => role.users)
  @JoinTable()
  roles: RoleOrm[];
  @ManyToMany(() => PermissionOrm, (permission) => permission.users)
  @JoinTable()
  permissions: PermissionOrm[];

  @OneToMany(
    () => Stock_transfersOrm,
    (stock_transfers) => stock_transfers.created_by,
  )
  stock_transfers: Stock_transfersOrm[];
  @OneToMany(
    () => Stock_movementsOrm,
    (stock_movements) => stock_movements.created_by,
  )
  stock_movements: Stock_transfersOrm[];

  @OneToMany(
    () => Stock_adjustmentsOrm,
    (stock_adjustments) => stock_adjustments.created_by,
  )
  stock_adjustments: Stock_adjustmentsOrm[];

  @OneToMany(
    () => Stock_adjustmentsOrm,
    (stock_adjustments_approved) => stock_adjustments_approved.adjusted_by,
  )
  stock_adjustments_approved: Stock_adjustmentsOrm[];

  @OneToMany(
    () => Inbound_ordersOrm,
    (inbound_orders) => inbound_orders.created_by,
  )
  inbound_orders: Inbound_ordersOrm[];
}

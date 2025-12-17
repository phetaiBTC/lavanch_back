import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { PermissionOrm } from './permission.orm-entity';
import { RoleOrm } from './role.orm-entity';
import { StockTransfersOrm } from './stock_transfers.orm-entity';
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
  @OneToMany(() => StockTransfersOrm, (stock_transfer) => stock_transfer.user)
  stock_transfers: StockTransfersOrm[];
}

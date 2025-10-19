import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { PermissionOrm } from './permission.orm-entity';
import { UserOrm } from './user.orm-entity';

@Entity('role')
export class RoleOrm extends ShardOrm {
  @Column({ unique: true })
  code: string;

  @ManyToMany(() => PermissionOrm, (permission) => permission.roles)
  @JoinTable()
  permissions: PermissionOrm[];

  @ManyToMany(() => UserOrm, (user) => user.roles)
  users: UserOrm[];
}

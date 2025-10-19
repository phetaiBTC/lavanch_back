
import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { RoleOrm } from './role.orm-entity';
import { UserOrm } from './user.orm-entity';
@Entity('permission')
export class PermissionOrm extends ShardOrm {
  @Column() code : string
  @ManyToMany(() => RoleOrm, (role) => role.permissions)
  roles: RoleOrm[]
  @ManyToMany(() => UserOrm, (user) => user.permissions)
  users: UserOrm[]
}

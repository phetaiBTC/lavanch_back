import { ShardEntity } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { PermissionOrm } from './permission.orm-entity';
import { RoleOrm } from './role.orm-entity';
@Entity('User'.toLowerCase())
export class UserOrm extends ShardEntity {
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
}

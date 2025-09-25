import { Exclude } from 'class-transformer';
import { ShardEntity } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column } from 'typeorm';
@Entity('User'.toLowerCase())
export class UserOrm extends ShardEntity {
  @Column() username: string;
  @Column({ unique: true }) email: string;
  @Column()
  password: string;
  @Column({ default: false })
  is_verified: boolean;
}

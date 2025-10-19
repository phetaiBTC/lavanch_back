import { ShardEntity } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column } from 'typeorm';
@Entity('images')
export class ImagesOrm extends ShardEntity {
  @Column({ type: 'text' })
  url: string;
  @Column({ type: 'text' })
  key: string;
}

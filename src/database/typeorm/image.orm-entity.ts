import { ShardOrm } from 'src/shared/typeorm/base.orm-entity';
import { Entity, Column } from 'typeorm';
@Entity('images')
export class ImagesOrm extends ShardOrm {
  @Column({ type: 'text' })
  url: string;
  @Column({ type: 'text' })
  key: string;
}

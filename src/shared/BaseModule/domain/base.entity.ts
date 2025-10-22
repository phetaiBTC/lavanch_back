import { ShardInterfaceProps } from '../interface/Base.interface';

export class ShardEntity<T extends ShardInterfaceProps> {
  protected id?: number;
  protected createdAt?: Date;
  protected updatedAt?: Date;
  protected deletedAt?: Date | null;

  constructor(props: Partial<T>) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt ?? null;
  }
}

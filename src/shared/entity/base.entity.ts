import { ShardInterfaceProps } from "../interface/Base.interface";

export class ShardEntity<T extends ShardInterfaceProps = ShardInterfaceProps> {
  id: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(props?: Partial<T>) {
    this.id = props?.id ?? null;
    this.createdAt = props?.createdAt ?? new Date();
    this.updatedAt = props?.updatedAt ?? new Date();
    this.deletedAt = props?.deletedAt ?? null;
  }
}
import { Inbound_ordersProps } from '../interface/inbound_orders.interface';

export class Inbound_orders {
  private id: number | null;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: Inbound_ordersProps) {
    this.id = props.id ?? null;
    this.name = props.name;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  update(
    props: Partial<
      Omit<Inbound_ordersProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new Inbound_orders({
      ...this.value,
      ...props,
    });
  }
}
import { Inbound_order_itemsProps } from '../interface/inbound_order_items.interface';

export class Inbound_order_items {
  private id: number | null;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: Inbound_order_itemsProps) {
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
      Omit<Inbound_order_itemsProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new Inbound_order_items({
      ...this.value,
      ...props,
    });
  }
}
import { Stock_adjustmentsProps } from '../interface/stock_adjustments.interface';

export class Stock_adjustments {
  private id: number | null;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: Stock_adjustmentsProps) {
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
      Omit<Stock_adjustmentsProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new Stock_adjustments({
      ...this.value,
      ...props,
    });
  }
}
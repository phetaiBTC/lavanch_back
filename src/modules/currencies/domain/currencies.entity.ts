import { CurrenciesProps } from '../interface/currencies.interface';
export class Currencies {
  private id?: number;
  private code: string;
  private symbol: string;
  private is_active: boolean;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;
  constructor(props: CurrenciesProps) {
    this.id = props.id;
    this.code = props.code;
    this.name = props.name;
    this.symbol = props.symbol;
    this.is_active = props.is_active ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }
  get value() {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      symbol: this.symbol,
      is_active: this.is_active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: Partial<CurrenciesProps>): Currencies {
    return new Currencies({
      ...this.value,
      ...props,
      updatedAt: new Date(),
    });
  }
}

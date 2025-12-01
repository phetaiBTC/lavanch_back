import { ShardEntity } from 'src/shared/BaseModule/domain/base.entity';
import { CurrenciesProps } from '../interface/currencies.interface';
export class Currencies extends ShardEntity<CurrenciesProps> {
  private code: string;
  private symbol: string;
  private is_active: boolean;
  private name: string;

  constructor(props: CurrenciesProps) {
    super(props);
    this.code = props.code;
    this.name = props.name;
    this.symbol = props.symbol;
    this.is_active = props.is_active ?? true;
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

  update(
    props: Partial<
      Omit<CurrenciesProps, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ): Currencies {
    return new Currencies({
      ...this.value,
      ...props,
    });
  }
}

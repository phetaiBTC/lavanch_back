import { Currencies } from '../domain/currencies.entity';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
import { CurrenciesResponse } from '../interface/currencies.interface';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
class CurrenciesMapperClass extends BaseMapper<
  Currencies,
  CurrenciesOrm,
  CurrenciesResponse
> {
  toDomain = (schema: CurrenciesOrm): Currencies => {
    return new Currencies({
      id: schema.id,
      code: schema.code,
      name: schema.name,
      symbol: schema.symbol,
      is_active: schema.is_active,
      ...this.getTimestampsFromSchema(schema),
    });
  };
  toSchema = (domain: Currencies): CurrenciesOrm => {
    const schema = new CurrenciesOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.code = domain.value.code;
    schema.name = domain.value.name;
    schema.symbol = domain.value.symbol;
    schema.is_active = domain.value.is_active;
    return schema;
  };
  toResponse = (domain: Currencies): CurrenciesResponse => {
    return {
      id: domain.value.id!,
      code: domain.value.code,
      name: domain.value.name,
      symbol: domain.value.symbol,
      is_active: domain.value.is_active,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const CurrenciesMapper = new CurrenciesMapperClass();

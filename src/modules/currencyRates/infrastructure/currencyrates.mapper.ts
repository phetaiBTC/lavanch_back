import { CurrencyRates } from '../domain/currencyrates.entity';
import { CurrencyRatesOrm } from 'src/database/typeorm/currencyRates.orm-entity';
import { CurrencyRatesResponse } from '../interface/currencyrates.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';
import { CurrenciesMapper } from 'src/modules/currencies/infrastructure/currencies.mapper';
export const CurrencyRatesMapper = {
  toDomain(schema: CurrencyRatesOrm): CurrencyRates {
    return new CurrencyRates({
      id: schema.id,
      from_currency_id: CurrenciesMapper.toDomain(schema.from_currency_id),
      to_currency_id: CurrenciesMapper.toDomain(schema.to_currency_id),
      rate: schema.rate,
      rate_date: schema.rate_date,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },
  toSchema(domain: CurrencyRates): CurrencyRatesOrm {
    const schema = new CurrencyRatesOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.from_currency_id = CurrenciesMapper.toSchema(
      domain.value.from_currency_id,
    );
    schema.to_currency_id = CurrenciesMapper.toSchema(
      domain.value.to_currency_id,
    );
    schema.rate = domain.value.rate;
    schema.rate_date = domain.value.rate_date;
    return schema;
  },
  toResponse(domain: CurrencyRates): CurrencyRatesResponse {
    return {
      id: domain.value.id!,
      from_currency_id: domain.value.from_currency_id,
      to_currency_id: domain.value.to_currency_id,
      rate: domain.value.rate,
      rate_date: domain.value.rate_date,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },
  toResponseList(domain: {
    data: CurrencyRates[];
    pagination: IPagination;
  }): PaginatedResponse<CurrencyRatesResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};

import { Currencies } from '../domain/currencies.entity';
import { CurrenciesOrm } from 'src/database/typeorm/currencies.orm-entity';
import { CurrenciesResponse } from '../interface/currencies.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';
export const CurrenciesMapper = {
  toDomain(schema: CurrenciesOrm): Currencies {
    return new Currencies({
      id: schema.id,
      code: schema.code,
      name: schema.name,
      symbol: schema.symbol,
      is_active: schema.is_active,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },
  toSchema(domain: Currencies): CurrenciesOrm {
    const schema = new CurrenciesOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.code = domain.value.code;
    schema.name = domain.value.name;
    schema.symbol = domain.value.symbol;
    schema.is_active = domain.value.is_active;
    return schema;
  },
  toResponse(domain: Currencies): CurrenciesResponse {
    return {
      id: domain.value.id!,
      code: domain.value.code,
      name: domain.value.name,
      symbol: domain.value.symbol,
      is_active: domain.value.is_active,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },
  toResponseList(domain: {
    data: Currencies[];
    pagination: IPagination;
  }): PaginatedResponse<CurrenciesResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};

import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';

export abstract class BaseMapper<TDomain, TOrm, TResponse> {
  abstract toDomain(schema: TOrm): TDomain;
  abstract toSchema(domain: TDomain): TOrm;
  abstract toResponse(domain: TDomain): TResponse;

  toResponseList(domain: {
    data: TDomain[];
    pagination: IPagination;
  }): PaginatedResponse<TResponse> {
    return {
      data: domain.data.map((item) => this.toResponse(item)),
      pagination: domain.pagination,
    };
  }

  protected formatDateField(date?: Date | null): string | null {
    return date ? formatDate(date) : null;
  }

  protected getTimestampsFromSchema(schema: any) {
    return {
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    };
  }

  protected getFormattedTimestamps(domain: any) {
    return {
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: this.formatDateField(domain.value.deletedAt),
    };
  }
}
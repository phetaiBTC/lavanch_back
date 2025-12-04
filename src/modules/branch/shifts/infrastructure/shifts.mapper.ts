import { Shifts } from '../domain/shifts.entity';
import { ShiftsOrm } from 'src/database/typeorm/shifts.orm-entity';
import { ShiftsResponse } from '../interface/shifts.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';

export const ShiftsMapper = {
  toDomain(schema: ShiftsOrm): Shifts {
    return new Shifts({
      id: schema.id,
      start_time: schema.start_time,
      end_time: schema.end_time,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },

  toSchema(domain: Shifts): ShiftsOrm {
    const schema = new ShiftsOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.start_time = domain.value.start_time;
    schema.end_time = domain.value.end_time;
    return schema;
  },

  toResponse(domain: Shifts): ShiftsResponse {
    return {
      id: domain.value.id!,
      start_time: domain.value.start_time,
      end_time: domain.value.end_time,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },

  toResponseList(domain: {
    data: Shifts[];
    pagination: IPagination;
  }): PaginatedResponse<ShiftsResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};

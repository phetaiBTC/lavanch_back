import { PermissionOrm } from 'src/database/typeorm/permission.orm-entity';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';
import { Permission } from '../domain/permission.entity';
import { PermissionResponse } from '../interface/permission.interface';
export const PermissionMapper = {
  toDomain(schema: PermissionOrm): Permission {
    return new Permission({
      id: schema.id,
      code: schema.code,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },
  toSchema(domain: Permission): PermissionOrm {
    const schema = new PermissionOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.code = domain.value.code;
    return schema;
  },
  toResponse(domain: Permission): PermissionResponse {
    return {
      id: domain.value.id!,
      code: domain.value.code,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },
  toResponseList(domain: {
    data: Permission[];
    pagination: IPagination;
  }): PaginatedResponse<PermissionResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};

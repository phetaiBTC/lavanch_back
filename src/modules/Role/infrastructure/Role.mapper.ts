import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';
import { Role } from '../domain/Role.entity';
import { RoleResponse } from '../interface/Role.interface';
import { PermissionMapper } from 'src/modules/Permission/infrastructure/Permission.mapper';
export const RoleMapper = {
  toDomain(schema: RoleOrm): Role {
    return new Role({
      id: schema.id,
      code: schema.code,
      permissions: schema.permissions.map((permission) =>
        PermissionMapper.toDomain(permission),
      ),
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },
  toSchema(domain: Role): RoleOrm {
    const schema = new RoleOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.code = domain.value.code;
    schema.permissions = domain.value.permissions.map((permission) =>
      PermissionMapper.toSchema(permission),
    );
    return schema;
  },
  toResponse(domain: Role): RoleResponse {
    return {
      id: domain.value.id!,
      code: domain.value.code,
      permissions: domain.value.permissions.map((permission) =>
        PermissionMapper.toResponse(permission),
      ),
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },
  toResponseList(domain: {
    data: Role[];
    pagination: IPagination;
  }): PaginatedResponse<RoleResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};

import { Role } from '../domain/role.entity';
import { RoleOrm } from 'src/database/typeorm/role.orm-entity';
import { RoleResponse } from '../interface/role.interface';
import { PermissionMapper } from 'src/modules/permission/infrastructure/permission.mapper';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
class RoleMapperClass extends BaseMapper<Role, RoleOrm, RoleResponse> {
  toDomain = (schema: RoleOrm): Role => {
    return new Role({
      id: schema.id,
      code: schema.code,
      permissions: schema.permissions.map((permission) =>
        PermissionMapper.toDomain(permission),
      ),
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema(domain: Role): RoleOrm {
    const schema = new RoleOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.code = domain.value.code;
    schema.permissions = domain.value.permissions.map((permission) =>
      PermissionMapper.toSchema(permission),
    );
    return schema;
  }

  toResponse(domain: Role): RoleResponse {
    return {
      id: domain.value.id!,
      code: domain.value.code,
      permissions: domain.value.permissions.map((permission) =>
        PermissionMapper.toResponse(permission),
      ),
      ...this.getFormattedTimestamps(domain),
    };
  }
}

export const RoleMapper = new RoleMapperClass();

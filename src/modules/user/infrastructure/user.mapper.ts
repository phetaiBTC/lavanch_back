import { User } from '../domain/user.entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { UserResponse } from '../interface/user.interface';
import { PermissionMapper } from 'src/modules/permission/infrastructure/permission.mapper';
import { RoleMapper } from 'src/modules/role/infrastructure/role.mapper';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
class UserMapperClass extends BaseMapper<User, UserOrm, UserResponse> {
  toDomain = (schema: UserOrm): User => {
    return new User({
      id: schema.id,
      username: schema.username,
      email: schema.email,
      password: schema.password,
      is_verified: schema.is_verified,
      roles: schema.roles.map((role) => RoleMapper.toDomain(role)),
      permission: schema.permissions.map((permission) =>
        PermissionMapper.toDomain(permission),
      ),
      ...this.getTimestampsFromSchema(schema),
    });
  };
  toSchema(domain: User): UserOrm {
    const schema = new UserOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.username = domain.value.username;
    schema.email = domain.value.email;
    schema.password = domain.value.password;
    schema.roles = domain.value.roles.map((role) => RoleMapper.toSchema(role));
    schema.permissions = domain.value.permissions.map((permission) =>
      PermissionMapper.toSchema(permission),
    );
    schema.is_verified = domain.value.is_verified;
    return schema;
  }
  toResponse(domain: User): UserResponse {
    return {
      id: domain.value.id!,
      username: domain.value.username,
      email: domain.value.email,
      is_verified: domain.value.is_verified,
      roles: domain.value.roles.map((role) => RoleMapper.toResponse(role)),
      permissions: domain.value.permissions.map((permission) =>
        PermissionMapper.toResponse(permission),
      ),
      ...this.getFormattedTimestamps(domain),
    };
  }
}

export const UserMapper = new UserMapperClass();

import { User } from '../domain/User.entity';
import { UserOrm } from 'src/database/typeorm/user.orm-entity';
import { UserResponse } from '../interface/User.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';
export const UserMapper = {
  toDomain(schema: UserOrm): User {
    return new User({
      id: schema.id,
      username: schema.username,
      email: schema.email,
      password: schema.password,
      is_verified: schema.is_verified,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },
  toSchema(domain: User): UserOrm {
    const schema = new UserOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    schema.username = domain.value.username;
    schema.email = domain.value.email;
    schema.password = domain.value.password;
    schema.is_verified = domain.value.is_verified;
    return schema;
  },
  toResponse(domain: User): UserResponse {
    return {
      id: domain.value.id!,
      username: domain.value.username,
      email: domain.value.email,
      is_verified: domain.value.is_verified,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },
  toResponseList(domain: {
    data: User[];
    pagination: IPagination;
  }): PaginatedResponse<UserResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};

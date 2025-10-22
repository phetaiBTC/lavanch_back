// import { Category } from '../domain/category.entity';
// import { CategoryResponse } from '../interface/category.interface';
// import { formatDate } from 'src/shared/utils/dayjs.util';
// import { CategoryOrm } from 'src/database/typeorm/category.orm-entity';
// import {
//   IPagination,
//   PaginatedResponse,
// } from 'src/shared/interface/pagination.interface';
// export const CategoryMapper = {
//   toDomain(schema: CategoryOrm): Category {
//     return new Category({
//       id: schema.id,
//       name: schema.name,
//       description: schema.description,
//       parent: schema.parent ? this.toDomain(schema.parent) : null,
//       children: schema.children
//         ? schema.children.map((child) => this.toDomain(child))
//         : [],
//       is_active: schema.is_active,
//       createdAt: schema.createdAt,
//       updatedAt: schema.updatedAt,
//       deletedAt: schema.deletedAt,
//     });
//   },
//   toSchema(domain: Category): CategoryOrm {
//     const schema = new CategoryOrm();
//     if (domain.id != null) schema.id = domain.id;
//     if (domain.name != null) schema.name = domain.name;
//     if (domain.description != null) schema.description = domain.description;
//     if (domain.is_active != null) schema.is_active = domain.is_active;

//     schema.parent = domain.parent
//       ? CategoryMapper.toSchema(domain.parent)
//       : undefined;

//     schema.children = domain.children
//       ? domain.children.map((child) => CategoryMapper.toSchema(child))
//       : [];
//     return schema;
//   },

//   toResponse(domain: Category): CategoryResponse {
//     return {
//       id: domain.value.id!,
//       name: domain.value.name,
//       description: domain.value.description ?? '',
//       parent: domain.value.parent,
//       children: domain.value.children,
//       is_active: domain.value.is_active,
//       createdAt: formatDate(domain.value.createdAt),
//       updatedAt: formatDate(domain.value.updatedAt),
//       deletedAt: domain.value.deletedAt
//         ? formatDate(domain.value.deletedAt)
//         : null,
//     };
//   },
//   toResponseList(domain: {
//     data: Category[];
//     pagination: IPagination;
//   }): PaginatedResponse<CategoryResponse> {
//     return {
//       data: domain.data.map((domain) => this.toResponse(domain)),
//       pagination: domain.pagination,
//     };
//   },
// };


import { Category } from '../domain/category.entity';
import { CategoryResponse } from '../interface/category.interface';
import { CategoryOrm } from 'src/database/typeorm/category.orm-entity';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';

class CategoryMapperClass extends BaseMapper<Category, CategoryOrm, CategoryResponse> {
  toDomain = (schema: CategoryOrm): Category => {
    return new Category({
      id: schema.id,
      name: schema.name,
      description: schema.description,
      parent: schema.parent ? this.toDomain(schema.parent) : null,
      children: schema.children
        ? schema.children.map((child) => this.toDomain(child))
        : [],
      is_active: schema.is_active,
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: Category): CategoryOrm => {
    const schema = new CategoryOrm();

    if (domain.value.id != null) schema.id = domain.value.id;
    if (domain.value.name != null) schema.name = domain.value.name;
    if (domain.value.description != null)
      schema.description = domain.value.description;
    if (domain.value.is_active != null)
      schema.is_active = domain.value.is_active;

    schema.parent = domain.value.parent
      ? this.toSchema(domain.value.parent)
      : undefined;

    schema.children = domain.value.children
      ? domain.value.children.map((child) => this.toSchema(child))
      : [];

    return schema;
  };

  toResponse = (domain: Category): CategoryResponse => {
    return {
      id: domain.value.id!,
      name: domain.value.name,
      description: domain.value.description ?? '',
      parent: domain.value.parent
        ? this.toResponse(domain.value.parent)
        : null,
      children: domain.value.children
        ? domain.value.children.map((child) => this.toResponse(child))
        : [],
      is_active: domain.value.is_active,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const CategoryMapper = new CategoryMapperClass();

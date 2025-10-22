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

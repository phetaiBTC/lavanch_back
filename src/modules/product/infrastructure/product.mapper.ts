
import { Product } from '../domain/product.entity';
import { ProductResponse } from '../interface/product.interface';
import { ProductOrm } from 'src/database/typeorm/product.orm-entity';
import { CategoryMapper } from 'src/modules/category/infrastructure/category.mapper';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';

class ProductMapperClass extends BaseMapper<Product, ProductOrm, ProductResponse> {
  toDomain = (schema: ProductOrm): Product => {
    return new Product({
      id: schema.id,
      name: schema.name,
      brand: schema.brand,
      category: schema.category
        ? CategoryMapper.toDomain(schema.category)
        : null,
      description: schema.description,
      barcode: schema.barcode,
      is_active: schema.is_active,
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: Product): ProductOrm => {
    const schema = new ProductOrm();

    if (domain.value.id != null) schema.id = domain.value.id;
    if (domain.value.name != null) schema.name = domain.value.name;
    if (domain.value.brand != null) schema.brand = domain.value.brand;
    if (domain.value.category != null)
      schema.category = CategoryMapper.toSchema(domain.value.category);
    if (domain.value.description != null)
      schema.description = domain.value.description;
    if (domain.value.barcode != null) schema.barcode = domain.value.barcode;
    if (domain.value.is_active != null)
      schema.is_active = domain.value.is_active;

    return schema;
  };

  toResponse = (domain: Product): ProductResponse => {
    return {
      id: domain.value.id!,
      name: domain.value.name,
      brand: domain.value.brand,
      category: domain.value.category
        ? CategoryMapper.toResponse(domain.value.category)
        : null,
      description: domain.value.description ?? '',
      barcode: domain.value.barcode,
      is_active: domain.value.is_active,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const ProductMapper = new ProductMapperClass();


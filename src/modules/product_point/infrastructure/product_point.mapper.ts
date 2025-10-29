

import { ProductPoint } from '../domain/product_point.entity';
import { ProductPointOrm } from 'src/database/typeorm/product_point.orm-entity';
import { ProductPointResponse } from '../interface/product_point.interface';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
import { ProductVariantMapper } from 'src/modules/product_variant/infrastructure/product_variant.mapper';
import { UnitMapper } from 'src/modules/unit/infrastructure/unit.mapper';

class ProductPointMapperClass extends BaseMapper<
  ProductPoint,
  ProductPointOrm,
  ProductPointResponse
> {
  toDomain = (schema: ProductPointOrm): ProductPoint => {
    return new ProductPoint({
      id: schema.id,
      points_per_unit: schema.points_per_unit,
      is_active: schema.is_active,
      effective_date: schema.effective_date,
      product_variant: schema.product_variant
        ? ProductVariantMapper.toDomain(schema.product_variant)
        : null,
      unit: schema.unit ? UnitMapper.toDomain(schema.unit) : null,
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: ProductPoint): ProductPointOrm => {
    const schema = new ProductPointOrm();

    if (domain.value.id != null) schema.id = domain.value.id;
    if (domain.value.product_variant != null)
      schema.product_variant = ProductVariantMapper.toSchema(
        domain.value.product_variant,
      );
    if (domain.value.unit != null)
      schema.unit = UnitMapper.toSchema(domain.value.unit);
    if (domain.value.points_per_unit != null)
      schema.points_per_unit = domain.value.points_per_unit;
    if (domain.value.is_active != null)
      schema.is_active = domain.value.is_active;
    if (domain.value.effective_date != null)
      schema.effective_date = domain.value.effective_date;

    return schema;
  };

  toResponse = (domain: ProductPoint): ProductPointResponse => {
    return {
      id: domain.value.id!,
      product_variant: domain.value.product_variant
        ? ProductVariantMapper.toResponse(domain.value.product_variant)
        : null,
      unit: domain.value.unit ? UnitMapper.toResponse(domain.value.unit) : null,
      points_per_unit: domain.value.points_per_unit ?? 0,
      is_active: domain.value.is_active ?? true,
      effective_date: domain.value.effective_date,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const ProductPointMapper = new ProductPointMapperClass();

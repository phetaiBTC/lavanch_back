import { TieredPrice } from '../domain/tiered_price.entity';
import { TieredPriceResponse } from '../interface/tiered_price.interface';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
import { ProductVariantMapper } from 'src/modules/product_variant/infrastructure/product_variant.mapper';
import { UnitMapper } from 'src/modules/unit/infrastructure/unit.mapper';
import { TieredPriceOrm } from 'src/database/typeorm/tiered-price.orm-entity';

export class TieredPriceMapperClass extends BaseMapper<
  TieredPrice,
  TieredPriceOrm,
  TieredPriceResponse
> {
  toDomain = (schema: TieredPriceOrm): TieredPrice => {
    return new TieredPrice({
      id: schema.id,
      min_quantity: schema.min_quantity,
      max_quantity: schema.max_quantity,
      price_per_unit: schema.price_per_unit,
      is_active: schema.is_active,
      product_variant: ProductVariantMapper.toDomain(schema.product_variant),
      unit: UnitMapper.toDomain(schema.unit),
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: TieredPrice): TieredPriceOrm => {
    const schema = new TieredPriceOrm();
    const v = domain.value;
    if (v.id) schema.id = v.id;
    schema.product_variant = ProductVariantMapper.toSchema(v.product_variant);
    schema.unit = UnitMapper.toSchema(v.unit);
    schema.min_quantity = v.min_quantity;
    schema.max_quantity = v.max_quantity;
    schema.price_per_unit = v.price_per_unit;
    schema.is_active = v.is_active;
    return schema;
  };

  toResponse = (domain: TieredPrice): TieredPriceResponse => {
    const v = domain.value;
    return {
      id: v.id!,
      min_quantity: v.min_quantity,
      max_quantity: v.max_quantity,
      price_per_unit: v.price_per_unit,
      is_active: v.is_active,
      product_variant: ProductVariantMapper.toResponse(v.product_variant),
      unit: UnitMapper.toResponse(v.unit),
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const TieredPriceMapper = new TieredPriceMapperClass();
import { ProductPrice } from '../domain/product_price.entity';
import { ProductPriceOrm } from 'src/database/typeorm/product_price.orm-entity';
import { Product } from 'src/modules/product/domain/product.entity';
import { ProductVariantMapper } from 'src/modules/product_variant/infrastructure/product_variant.mapper';
import { UnitMapper } from 'src/modules/unit/infrastructure/unit.mapper';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
import { ProductPriceResponse } from '../interface/product_price.interface';

export class ProductPriceMapperClass extends BaseMapper<
  ProductPrice,
  ProductPriceOrm,
  ProductPriceResponse
> {
  toDomain = (schema: ProductPriceOrm): ProductPrice => {
    return new ProductPrice({
      id: schema.id,
      product_variant: ProductVariantMapper.toDomain(schema.product_variant),
      unit: UnitMapper.toDomain(schema.unit),
      cost_price: schema.cost_price,
      selling_price: schema.selling_price,
      min_price: schema.min_price,
      is_active: schema.is_active,
      effective_date: schema.effective_date,
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: ProductPrice): ProductPriceOrm => {
    const schema = new ProductPriceOrm();
    const value = domain.value;
    if (value.id != null) {
      schema.id = value.id;
    }
    if (value.product_variant != null) {
      schema.product_variant = ProductVariantMapper.toSchema(
        value.product_variant,
      );
    }
    if (value.unit != null) {
      schema.unit = UnitMapper.toSchema(value.unit);
    }
    if (value.cost_price != null) schema.cost_price = value.cost_price;
    if (value.selling_price != null) schema.selling_price = value.selling_price;
    if (value.min_price != null) schema.min_price = value.min_price;
    if (value.is_active != null) schema.is_active = value.is_active;
    if (value.effective_date != null)
      schema.effective_date = value.effective_date;
    return schema;
  };

  toResponse = (domain: ProductPrice): ProductPriceResponse => {
    const value = domain.value;
    return {
      id: value.id!,
      product_variant: ProductVariantMapper.toResponse(value.product_variant),
      unit: UnitMapper.toResponse(value.unit),
      cost_price: value.cost_price,
      selling_price: value.selling_price,
      min_price: value.min_price,
      is_active: value.is_active,
      effective_date: value.effective_date,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const ProductPriceMapper = new ProductPriceMapperClass();

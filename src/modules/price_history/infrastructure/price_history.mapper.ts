import { PriceHistory } from '../domain/price_history.entity';
import { PriceHistoryOrm } from 'src/database/typeorm/price_history.orm-entity';
import { PriceHistoryResponse } from '../interface/price_history.interface';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
import { UnitMapper } from 'src/modules/unit/infrastructure/unit.mapper';
import { UserMapper } from 'src/modules/user/infrastructure/user.mapper';
import { ProductVariantMapper } from 'src/modules/product_variant/infrastructure/product_variant.mapper';

export class PriceHistoryMapperClass extends BaseMapper<
  PriceHistory,
  PriceHistoryOrm,
  PriceHistoryResponse
> {
  toDomain = (schema: PriceHistoryOrm): PriceHistory => {
    return new PriceHistory({
      id: schema.id,
      change_date: schema.change_date,
      old_cost_price: schema.old_cost_price,
      new_cost_price: schema.new_cost_price,
      old_selling_price: schema.old_selling_price,
      new_selling_price: schema.new_selling_price,
      reason: schema.reason,
      product_variant: ProductVariantMapper.toDomain(schema.product_variant),
      unit: UnitMapper.toDomain(schema.unit),
      changed_by: UserMapper.toDomain(schema.changed_by),
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: PriceHistory): PriceHistoryOrm => {
    const schema = new PriceHistoryOrm();
    const value = domain.value;
    if (domain.value.id != null) schema.id = domain.value.id;
    if (value.old_cost_price != null)
      schema.old_cost_price = value.old_cost_price;
    if (value.new_cost_price != null)
      schema.new_cost_price = value.new_cost_price;
    if (value.old_selling_price != null)
      schema.old_selling_price = value.old_selling_price;
    if (value.new_selling_price != null)
      schema.new_selling_price = value.new_selling_price;

    if (value.reason != null) schema.reason = value.reason;
    if (value.change_date != null) schema.change_date = value.change_date;

    if (value.changed_by != null)
      schema.changed_by = UserMapper.toSchema(value.changed_by);
    if (value.product_variant != null)
      schema.product_variant = ProductVariantMapper.toSchema(
        value.product_variant,
      );
    if (value.unit != null) schema.unit = UnitMapper.toSchema(value.unit);
    return schema;
  };

  toResponse = (domain: PriceHistory): PriceHistoryResponse => {
    const v = domain.value;
    return {
      id: v.id!,

      old_cost_price: v.old_cost_price,
      new_cost_price: v.new_cost_price,
      old_selling_price: v.old_selling_price,
      new_selling_price: v.new_selling_price,
      changed_by: v.changed_by ? UserMapper.toResponse(v.changed_by) : null,
      product_variant: v.product_variant
        ? ProductVariantMapper.toResponse(v.product_variant)
        : null,
      unit: v.unit ? UnitMapper.toResponse(v.unit) : null,
      reason: v.reason,
      change_date: v.change_date!,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const PriceHistoryMapper = new PriceHistoryMapperClass();

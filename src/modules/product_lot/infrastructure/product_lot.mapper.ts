
import { ProductLot } from '../domain/product_lot.entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { ProductLotResponse } from '../interface/product_lot.interface';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
import { ProductVariantMapper } from 'src/modules/product_variant/infrastructure/product_variant.mapper';
import { CurrenciesMapper } from 'src/modules/currencies/infrastructure/currencies.mapper';

class ProductLotMapperClass extends BaseMapper<
  ProductLot,
  ProductLotOrm,
  ProductLotResponse
> {
  toDomain = (schema: ProductLotOrm): ProductLot => {
    return new ProductLot({
      id: schema.id,
      lot_number: schema.lot_number,
      manufacture_date: schema.manufacture_date,
      expiry_date: schema.expiry_date,
      quantity: schema.quantity,
      cost_price_local: Number(schema.cost_price_local),
      cost_price_original: Number(schema.cost_price_original),
      fx_rate: Number(schema.fx_rate),
      product_variant: ProductVariantMapper.toDomain(schema.product_variant),
      cost_currency: schema.cost_currency
        ? CurrenciesMapper.toDomain(schema.cost_currency)
        : null,
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: ProductLot): ProductLotOrm => {
    const schema = new ProductLotOrm();

    if (domain.value.id != null) schema.id = domain.value.id;
    if (domain.value.lot_number != null)
      schema.lot_number = domain.value.lot_number;
    if (domain.value.manufacture_date != null)
      schema.manufacture_date = domain.value.manufacture_date;
    if (domain.value.expiry_date != null)
      schema.expiry_date = domain.value.expiry_date;
    if (domain.value.quantity != null) schema.quantity = domain.value.quantity;
    if (domain.value.cost_price_local != null)
      schema.cost_price_local = domain.value.cost_price_local;
    if (domain.value.cost_price_original != null)
      schema.cost_price_original = domain.value.cost_price_original;
    if (domain.value.fx_rate != null) schema.fx_rate = domain.value.fx_rate;

    if (domain.value.product_variant != null)
      schema.product_variant = ProductVariantMapper.toSchema(
        domain.value.product_variant,
      );
    if (domain.value.cost_currency != null)
      schema.cost_currency = CurrenciesMapper.toSchema(
        domain.value.cost_currency,
      );

    return schema;
  };

  toResponse = (domain: ProductLot): ProductLotResponse => {
    return {
      id: domain.value.id!,
      lot_number: domain.value.lot_number,
      manufacture_date: domain.value.manufacture_date,
      expiry_date: domain.value.expiry_date,
      quantity: domain.value.quantity,
      cost_price_local: domain.value.cost_price_local,
      cost_price_original: domain.value.cost_price_original,
      fx_rate: domain.value.fx_rate,
      product_variant: domain.value.product_variant
        ? ProductVariantMapper.toResponse(domain.value.product_variant)
        : null,
      cost_currency: domain.value.cost_currency
        ? CurrenciesMapper.toResponse(domain.value.cost_currency)
        : null,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const ProductLotMapper = new ProductLotMapperClass();

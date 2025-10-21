import { ProductLot } from '../domain/product_lot.entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { ProductLotResponse } from '../interface/product_lot.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';
import { ProductVariantMapper } from 'src/modules/product_variant/infrastructure/product_variant.mapper';

export const ProductLotMapper = {
  toDomain(schema: ProductLotOrm): ProductLot {
    return new ProductLot({
      id: schema.id,
      product_variant: ProductVariantMapper.toDomain(schema.product_variant),
      lot_number: schema.lot_number,
      manufacture_date: schema.manufacture_date,
      expiry_date: schema.expiry_date,
    //   branch: new Branch({
    //     id: schema.branch.id,
    //     name: schema.branch.name,
    //     // add other Branch fields if needed
    //     createdAt: schema.branch.createdAt,
    //     updatedAt: schema.branch.updatedAt,
    //     deletedAt: schema.branch.deletedAt,
    //   }),
      quantity: schema.quantity,
      cost_price_local: Number(schema.cost_price_local),
    //   cost_currency: new Currency({
    //     id: schema.cost_currency.id,
    //     name: schema.cost_currency.name,
    //     code: schema.cost_currency.code,
    //     createdAt: schema.cost_currency.createdAt,
    //     updatedAt: schema.cost_currency.updatedAt,
    //     deletedAt: schema.cost_currency.deletedAt,
    //   }),
      cost_price_original: Number(schema.cost_price_original),
      fx_rate: Number(schema.fx_rate),
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },

  toSchema(domain: ProductLot): ProductLotOrm {
    const schema = new ProductLotOrm();
    if (domain.value.id != null) schema.id = domain.value.id;

    schema.product_variant = domain.value.product_variant as any; // หรือ map to ORM entity
    schema.lot_number = domain.value.lot_number;
    schema.manufacture_date = domain.value.manufacture_date;
    schema.expiry_date = domain.value.expiry_date;
    // schema.branch = domain.value.branch as any; // หรือ map to ORM entity
    // schema.quantity = domain.value.quantity;
    schema.cost_price_local = domain.value.cost_price_local;
    // schema.cost_currency = domain.value.cost_currency as any; // หรือ map to ORM entity
    schema.cost_price_original = domain.value.cost_price_original;
    schema.fx_rate = domain.value.fx_rate;

    return schema;
  },

  toResponse(domain: ProductLot): ProductLotResponse {
    return {
      id: domain.value.id!,
      lot_number: domain.value.lot_number,
      product_variant: domain.value.product_variant ?
        ProductVariantMapper.toResponse(domain.value.product_variant)
        : null,
    //   branch: {
    //     id: domain.value.branch.id!,
    //     name: domain.value.branch.name,
    //   },
      quantity: domain.value.quantity,
      cost_price_local: domain.value.cost_price_local,
    //   cost_currency: {
    //     id: domain.value.cost_currency.id!,
    //     name: domain.value.cost_currency.name,
    //     code: domain.value.cost_currency.code,
    //   },
      cost_price_original: domain.value.cost_price_original,
      fx_rate: domain.value.fx_rate,
      manufacture_date: domain.value.manufacture_date,
      expiry_date: domain.value.expiry_date,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },

  toResponseList(domain: {
    data: ProductLot[];
    pagination: IPagination;
  }): PaginatedResponse<ProductLotResponse> {
    return {
      data: domain.data.map((d) => this.toResponse(d)),
      pagination: domain.pagination,
    };
  },
};

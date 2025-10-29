// import { ProductVariant } from '../domain/product_variant.entity';
// import { ProductVariantResponse } from '../interface/product_variant.interface';
// import { formatDate } from 'src/shared/utils/dayjs.util';
// import {
//   IPagination,
//   PaginatedResponse,
// } from 'src/shared/interface/pagination.interface';
// import { ProductMapper } from 'src/modules/product/infrastructure/product.mapper';
// import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
// export const ProductVariantMapper = {
//   toDomain(schema: ProductVariantOrm): ProductVariant {
//     return new ProductVariant({
//       id: schema.id,
//       name: schema.name,
//       sku: schema.sku,
//       barcode: schema.barcode,
//       product: schema.product ? ProductMapper.toDomain(schema.product) : null,
//       is_active: schema.is_active,

//       createdAt: schema.createdAt,
//       updatedAt: schema.updatedAt,
//       deletedAt: schema.deletedAt,
//     });
//   },
//   toSchema(domain: ProductVariant): ProductVariantOrm {
//     const schema = new ProductVariantOrm();
//     if (domain.value.id != null) schema.id = domain.value.id;
//     if (domain.value.name != null) schema.name = domain.value.name;
//     if (domain.value.sku != null) schema.sku = domain.value.sku;
//     if (domain.value.barcode != null) schema.barcode = domain.value.barcode;
//     if (domain.value.product != null)
//       schema.product = ProductMapper.toSchema(domain.value.product);
//     if (domain.value.is_active != null) schema.is_active = domain.value.is_active;
//     return schema;
//   },
//   toResponse(domain: ProductVariant): ProductVariantResponse {
//     return {
//       id: domain.value.id!,
//       name: domain.value.name,
//       sku: domain.value.sku,
//       barcode: domain.value.barcode,
//       product: domain.value.product
//         ? ProductMapper.toResponse(domain.value.product)
//         : null,
//       is_active: domain.value.is_active,
//       createdAt: formatDate(domain.value.createdAt),
//       updatedAt: formatDate(domain.value.updatedAt),
//       deletedAt: domain.value.deletedAt
//         ? formatDate(domain.value.deletedAt)
//         : null,
//     };
//   },
//   toResponseList(domain: {
//     data: ProductVariant[];
//     pagination: IPagination;
//   }): PaginatedResponse<ProductVariantResponse> {
//     return {
//       data: domain.data.map((domain) => this.toResponse(domain)),
//       pagination: domain.pagination,
//     };
//   },
// };


import { ProductVariant } from '../domain/product_variant.entity';
import { ProductVariantResponse } from '../interface/product_variant.interface';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { BaseMapper } from 'src/shared/BaseModule/infrastructure/base.mapper';
import { ProductMapper } from 'src/modules/product/infrastructure/product.mapper';

class ProductVariantMapperClass extends BaseMapper<
  ProductVariant,
  ProductVariantOrm,
  ProductVariantResponse
> {
  toDomain = (schema: ProductVariantOrm): ProductVariant => {
    return new ProductVariant({
      id: schema.id,
      name: schema.name,
      sku: schema.sku,
      barcode: schema.barcode,
      product: schema.product ? ProductMapper.toDomain(schema.product) : null,
      is_active: schema.is_active,
      ...this.getTimestampsFromSchema(schema),
    });
  };

  toSchema = (domain: ProductVariant): ProductVariantOrm => {
    const schema = new ProductVariantOrm();

    if (domain.value.id != null) schema.id = domain.value.id;
    if (domain.value.name != null) schema.name = domain.value.name;
    if (domain.value.sku != null) schema.sku = domain.value.sku;
    if (domain.value.barcode != null) schema.barcode = domain.value.barcode;
    if (domain.value.is_active != null) schema.is_active = domain.value.is_active;
    if (domain.value.product != null)
      schema.product = ProductMapper.toSchema(domain.value.product);

    return schema;
  };

  toResponse = (domain: ProductVariant): ProductVariantResponse => {
    return {
      id: domain.value.id!,
      name: domain.value.name,
      sku: domain.value.sku,
      barcode: domain.value.barcode,
      product: domain.value.product
        ? ProductMapper.toResponse(domain.value.product)
        : null,
      is_active: domain.value.is_active,
      ...this.getFormattedTimestamps(domain),
    };
  };
}

export const ProductVariantMapper = new ProductVariantMapperClass();

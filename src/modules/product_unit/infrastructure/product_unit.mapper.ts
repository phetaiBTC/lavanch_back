import { ProductUnit } from '../domain/product_unit.entity';
import { ProductUnitResponse } from '../interface/product_unit.interface';
import { formatDate } from 'src/shared/utils/dayjs.util';
import {
  IPagination,
  PaginatedResponse,
} from 'src/shared/interface/pagination.interface';
import { ProductUnitOrm } from 'src/database/typeorm/product-unit.orm-entity';
import { ProductVariantMapper } from 'src/modules/product_variant/infrastructure/product_variant.mapper';
import { UnitMapper } from 'src/modules/unit/infrastructure/unit.mapper';
export const ProductUnitMapper = {
  toDomain(schema: ProductUnitOrm): ProductUnit {
    return new ProductUnit({
      id: schema.id,
      product_variant: schema.product_variant
        ? ProductVariantMapper.toDomain(schema.product_variant)
        : null,

      unit: schema.unit ? UnitMapper.toDomain(schema.unit) : null,
      quantity_per_unit: schema.quantity_per_unit,
      is_base_unit: schema.is_base_unit,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    });
  },
  toSchema(domain: ProductUnit): ProductUnitOrm {
    const schema = new ProductUnitOrm();
    if (domain.value.id != null) schema.id = domain.value.id;
    if (domain.value.product_variant != null)
      schema.product_variant = ProductVariantMapper.toSchema(
        domain.value.product_variant,
      );
    if (domain.value.unit != null)
      schema.unit = UnitMapper.toSchema(domain.value.unit);
    if (domain.value.quantity_per_unit != null)
      schema.quantity_per_unit = domain.value.quantity_per_unit;
    if (domain.value.is_base_unit != null)
      schema.is_base_unit = domain.value.is_base_unit;
    return schema;
  },
  toResponse(domain: ProductUnit): ProductUnitResponse {
    return {
      id: domain.value.id!,
      product_variant: domain.value.product_variant
        ? ProductVariantMapper.toResponse(domain.value.product_variant)
        : null,
      unit: domain.value.unit ? UnitMapper.toResponse(domain.value.unit) : null,
      quantity_per_unit: domain.value.quantity_per_unit ?? 0,
      is_base_unit: domain.value.is_base_unit,
      createdAt: formatDate(domain.value.createdAt),
      updatedAt: formatDate(domain.value.updatedAt),
      deletedAt: domain.value.deletedAt
        ? formatDate(domain.value.deletedAt)
        : null,
    };
  },
  toResponseList(domain: {
    data: ProductUnit[];
    pagination: IPagination;
  }): PaginatedResponse<ProductUnitResponse> {
    return {
      data: domain.data.map((domain) => this.toResponse(domain)),
      pagination: domain.pagination,
    };
  },
};

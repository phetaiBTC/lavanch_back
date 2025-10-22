import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_UNIT_REPOSITORY,
  type IProductUnitRepository,
} from '../../domain/product_unit.repository';
import { ProductUnit } from '../../domain/product_unit.entity';
import { UpdateProductUnitDto } from '../../dto/update-ProductUnit.dto';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from 'src/modules/product_variant/domain/product_variant.repository';
import {
  UNIT_REPOSITORY,
  type IUnitRepository,
} from 'src/modules/unit/domain/unit.repository';

@Injectable()
export class UpdateProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly productUnitRepo: IProductUnitRepository,
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,
    @Inject(UNIT_REPOSITORY)
    private readonly unitRepo: IUnitRepository,
  ) {}

  async execute(id: number, dto: UpdateProductUnitDto): Promise<ProductUnit> {
    const existing = await this.productUnitRepo.findById(id);
    if (!existing) throw new BadRequestException('ProductUnit not found');

    const [productVariant, unit] = await Promise.all([
      dto.product_variant_id
        ? this.productVariantRepo.findById(dto.product_variant_id)
        : Promise.resolve(null),
      dto.unit_id ? this.unitRepo.findById(dto.unit_id) : Promise.resolve(null),
    ]);

    if (productVariant && !productVariant.value.id)
      throw new BadRequestException('Product variant not found');
    if (unit && !unit.value.id) throw new BadRequestException('Unit not found');

    if (productVariant) existing.product_variant = productVariant;
    if (unit) existing.unit = unit;

    if (productVariant?.value.id && unit?.value.id) {
      const existing = await this.productUnitRepo.findByProductVariantAndUnit(
        productVariant.value.id,
        unit.value.id,
      );
      if (existing)
        throw new BadRequestException('Product Unit already exists');
    }

    if (dto.quantity_per_unit !== undefined)
      existing.value.quantity_per_unit = dto.quantity_per_unit;
    if (dto.is_base_unit !== undefined)
      existing.is_base_unit = dto.is_base_unit;

    return this.productUnitRepo.save(existing);
  }
}

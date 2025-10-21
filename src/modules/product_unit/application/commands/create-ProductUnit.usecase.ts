import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PRODUCT_UNIT_REPOSITORY, type IProductUnitRepository } from '../../domain/product_unit.repository';
import { ProductUnit } from '../../domain/product_unit.entity';
import { CreateProductUnitDto } from '../../dto/create-ProductUnit.dto';
import { PRODUCT_VARIANT_REPOSITORY, type IProductVariantRepository } from 'src/modules/product_variant/domain/product_variant.repository';
import { UNIT_REPOSITORY, type IUnitRepository } from 'src/modules/unit/domain/unit.repository';

@Injectable()
export class CreateProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly productUnitRepo: IProductUnitRepository,
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,
    @Inject(UNIT_REPOSITORY)
    private readonly unitRepo: IUnitRepository,
  ) {}

  async execute(dto: CreateProductUnitDto): Promise<ProductUnit> {
    const productVariant = await this.productVariantRepo.findById(dto.product_variant_id);
    if (!productVariant) throw new BadRequestException('Product variant not found');

    const unit = await this.unitRepo.findById(dto.unit_id);
    if (!unit) throw new BadRequestException('Unit not found');

    if (productVariant.id && unit.id) {
      const existing = await this.productUnitRepo.findByProductVariantAndUnit(
        productVariant.id,
        unit.id,
      );
      if (existing) throw new BadRequestException('Product Unit already exists');
    }

    const productUnit = new ProductUnit({
      product_variant: productVariant,
      unit,
      quantity_per_unit: dto.quantity_per_unit,
      is_base_unit: dto.is_base_unit ?? false,
    });

    return this.productUnitRepo.create(productUnit);
  }
}

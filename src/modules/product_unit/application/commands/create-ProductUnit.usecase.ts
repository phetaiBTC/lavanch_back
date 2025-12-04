import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductUnit } from '../../domain/product_unit.entity';
import { CreateProductUnitDto } from '../../dto/create-ProductUnit.dto';
import {
  PRODUCT_UNIT_REPOSITORY,
  type IProductUnitRepository,
} from '../../domain/product_unit.repository';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneUnitUseCase } from 'src/modules/unit/application/queries/findOne-Unit.usecase';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { Unit } from 'src/modules/unit/domain/unit.entity';

@Injectable()
export class CreateProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly productUnitRepo: IProductUnitRepository,

    private readonly findProductVariant: FindOneProductVariantUseCase,
    private readonly findUnit: FindOneUnitUseCase,
  ) {}

  async execute(dto: CreateProductUnitDto): Promise<ProductUnit> {
    const { product_variant, unit } = await this.loadRelations(dto);
    await this.ensureProductUnitDoesNotExist(product_variant, unit);

    const productUnit = new ProductUnit({
      ...dto,
      product_variant,
      unit,
    });

    return this.productUnitRepo.save(productUnit);
  }

  private async loadRelations(dto: CreateProductUnitDto) {
    const product_variant = await this.findProductVariant.execute(
      dto.product_variant_id,
    );
    const unit = await this.findUnit.execute(dto.unit_id);
    return { product_variant, unit };
  }

  private async ensureProductUnitDoesNotExist(
    productVariant: ProductVariant,
    unit: Unit,
  ) {
    if (productVariant.value.id && unit.value.id) {
      const exists = await this.productUnitRepo.findByProductVariantAndUnit(
        productVariant.value.id,
        unit.value.id,
      );
      if (exists) {
        throw new BadRequestException('Product Unit already exists');
      }
    }
  }
}

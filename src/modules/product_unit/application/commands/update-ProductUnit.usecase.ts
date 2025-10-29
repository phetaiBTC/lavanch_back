import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductUnit } from '../../domain/product_unit.entity';
import { UpdateProductUnitDto } from '../../dto/update-ProductUnit.dto';
import {
  PRODUCT_UNIT_REPOSITORY,
  type IProductUnitRepository,
} from '../../domain/product_unit.repository';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from 'src/modules/product_variant/domain/product_variant.repository';
import {
  UNIT_REPOSITORY,
  type IUnitRepository,
} from 'src/modules/unit/domain/unit.repository';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneUnitUseCase } from 'src/modules/unit/application/queries/findOne-Unit.usecase';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { Unit } from 'src/modules/unit/domain/unit.entity';
import { FindOneProductUnitUseCase } from '../queries/findOne-ProductUnit.usecase';

@Injectable()
export class UpdateProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly productUnitRepo: IProductUnitRepository,
    
    private readonly findProductVariant: FindOneProductVariantUseCase,
    private readonly findUnit: FindOneUnitUseCase,
        private readonly usecaseFIndOneProductUnit: FindOneProductUnitUseCase,

  ) {}

  async execute(id: number, dto: UpdateProductUnitDto): Promise<ProductUnit> {
    const productUnit = await this.usecaseFIndOneProductUnit.execute(id);;
    const { productVariant, unit } = await this.loadRelations(dto);

    await this.ensureProductUnitDoesNotExist(productVariant, unit, id);

    this.updateProductUnitValues(productUnit, dto, productVariant, unit);

    return this.productUnitRepo.save(productUnit);
  }



  private async loadRelations(dto: UpdateProductUnitDto) {
    if (!dto.product_variant_id || !dto.unit_id)
      return { productVariant: null, unit: null };

    const productVariant = await this.findProductVariant.execute(
      dto.product_variant_id,
    );
    const unit = await this.findUnit.execute(dto.unit_id);

    return { productVariant, unit };
  }

  private async ensureProductUnitDoesNotExist(
    productVariant: ProductVariant | null,
    unit: Unit | null,
    currentId: number,
  ) {
    if (!productVariant?.value.id || !unit?.value.id) return;

    const existing = await this.productUnitRepo.findByProductVariantAndUnit(
      productVariant.value.id,
      unit.value.id,
    );

    if (existing && existing.value.id !== currentId) {
      throw new BadRequestException('Product Unit already exists');
    }
  }

  private updateProductUnitValues(
    productUnit: ProductUnit,
    dto: UpdateProductUnitDto,
    productVariant: ProductVariant | null,
    unit: Unit | null,
  ) {
    if (productVariant) productUnit.value.product_variant = productVariant;
    if (unit) productUnit.value.unit = unit;

    if (dto.quantity_per_unit !== undefined)
      productUnit.value.quantity_per_unit = dto.quantity_per_unit;
    if (dto.is_base_unit !== undefined)
      productUnit.value.is_base_unit = dto.is_base_unit;
  }
}

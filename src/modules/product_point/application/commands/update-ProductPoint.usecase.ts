import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductPoint } from '../../domain/product_point.entity';
import { UpdateProductPointDto } from '../../dto/update-ProductPoint.dto';
import {
  PRODUCT_POINT_REPOSITORY,
  type IProductPointRepository,
} from '../../domain/product_point.repository';
import { PointNameCode } from 'src/shared/enum/point-name-code';
import { FindOneProductVariantUseCase } from 'src/modules/product_variant/application/queries/findOne-ProductVariant.usecase';
import { FindOneUnitUseCase } from 'src/modules/unit/application/queries/findOne-Unit.usecase';
import { FindNameCodePointUseCase } from 'src/modules/point/application/queries/findNameCode-Point.usecase';
import { ProductVariant } from 'src/modules/product_variant/domain/product_variant.entity';
import { Unit } from 'src/modules/unit/domain/unit.entity';
import { FindOneProductPointUseCase } from '../queries/findOne-ProductPoint.usecase';

@Injectable()
export class UpdateProductPointUseCase {
  constructor(
    @Inject(PRODUCT_POINT_REPOSITORY)
    private readonly repo: IProductPointRepository,

    private readonly usecaseProductVariant: FindOneProductVariantUseCase,
    private readonly usecaseUnit: FindOneUnitUseCase,
    private readonly usecaseFindNameCode: FindNameCodePointUseCase,
        private readonly usecaseFIndOneProductPoint: FindOneProductPointUseCase,

  ) {}

  async execute(id: number, dto: UpdateProductPointDto): Promise<ProductPoint> {
    const existing = await this.usecaseFIndOneProductPoint.execute(id);
    const { product_variant, unit} = await this.loadRelations(dto, existing);

    await this.validation(product_variant, unit, id);

    existing.update({
      product_variant,
      unit,
      points_per_unit : dto.points_per_unit ?? existing.value.points_per_unit,
      effective_date: dto.effective_date ? new Date(dto.effective_date) : existing.value.effective_date,
    });

    return this.repo.save(existing);
  }

  private async loadRelations(dto: UpdateProductPointDto, existing: ProductPoint) {
    const product_variant = dto.product_variant_id
      ? await this.usecaseProductVariant.execute(dto.product_variant_id)
      : existing.value.product_variant;

    const unit = dto.unit_id
      ? await this.usecaseUnit.execute(dto.unit_id)
      : existing.value.unit;

    const point = await this.usecaseFindNameCode.execute(PointNameCode.PRODUCT);

    return { product_variant, unit, point };
  }

  private async validation(product_variant: ProductVariant | null , unit: Unit | null, currentId: number) {
    if (!product_variant?.value.id || !unit?.value.id) return;
    if (product_variant.value.id && unit.value.id) {
      const existing = await this.repo.findByProductVariantAndUnit(
        product_variant.value.id,
        unit.value.id,
      );
      if (existing && existing.value.id !== currentId)
        throw new BadRequestException('Product Point already exists');
    }
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductPoint } from '../../domain/product_point.entity';
import { CreateProductPointDto } from '../../dto/create-ProductPoint.dto';
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

@Injectable()
export class CreateProductPointUseCase {
  constructor(
    @Inject(PRODUCT_POINT_REPOSITORY)
    private readonly repo: IProductPointRepository,

    private readonly uescaseProductVariant: FindOneProductVariantUseCase,
    private readonly usecaseUnit: FindOneUnitUseCase,
    private readonly usecaseFindNameCode: FindNameCodePointUseCase,
  ) {}

  async execute(dto: CreateProductPointDto): Promise<ProductPoint> {
    const { product_variant, unit, point } = await this.loadrelations(dto);

    await this.validation(product_variant, unit);
    const points_per_unit = 1 * point.value.points_multiplier;

    return this.repo.save(
      new ProductPoint({
        product_variant,
        unit,
        points_per_unit,
        is_active: dto.is_active,
        effective_date: new Date(dto.effective_date),
      }),
    );
  }

  async loadrelations(dto: CreateProductPointDto) {
    const product_variant = await this.uescaseProductVariant.execute(
      dto.product_variant_id,
    );
    const unit = await this.usecaseUnit.execute(dto.unit_id);
    const point = await this.usecaseFindNameCode.execute(PointNameCode.PRODUCT);
    return { product_variant, unit, point };
  }

  async validation(product_variant: ProductVariant, unit: Unit) {
    if (product_variant.value.id && unit.value.id) {
      const existing = await this.repo.findByProductVariantAndUnit(
        product_variant.value.id,
        unit.value.id,
      );
      if (existing)
        throw new BadRequestException('Product Point already exists');
    }
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductPoint } from '../../domain/product_point.entity';
import { CreateProductPointDto } from '../../dto/create-ProductPoint.dto';
import {
  PRODUCT_POINT_REPOSITORY,
  type IProductPointRepository,
} from '../../domain/product_point.repository';

import {
  type IUnitRepository,
  UNIT_REPOSITORY,
} from 'src/modules/unit/domain/unit.repository';
import {
  type IProductVariantRepository,
  PRODUCT_VARIANT_REPOSITORY,
} from 'src/modules/product_variant/domain/product_variant.repository';
import {
  type IPointRepository,
  POINT_REPOSITORY,
} from 'src/modules/point/domain/point.repository';
import { PointNameCode } from 'src/shared/enum/point-name-code';

@Injectable()
export class CreateProductPointUseCase {
  constructor(
    @Inject(PRODUCT_POINT_REPOSITORY)
    private readonly repo: IProductPointRepository,

    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,

    @Inject(UNIT_REPOSITORY)
    private readonly unitRepo: IUnitRepository,

    @Inject(POINT_REPOSITORY)
    private readonly pointRepo: IPointRepository,
  ) {}

  async execute(dto: CreateProductPointDto): Promise<ProductPoint> {
    const product_variant = await this.productVariantRepo.findById(
      dto.product_variant_id,
    );
    if (!product_variant)
      throw new BadRequestException('Product Variant not found');

    const unit = await this.unitRepo.findById(dto.unit_id);
    if (!unit) throw new BadRequestException('Unit not found');

    // if (!unit.is_active) throw new BadRequestException('Unit is not active');

    // if (!product_variant.is_active)
    //   throw new BadRequestException('Product Variant is not active');

    if (product_variant.id && unit.id) {
      const existing = await this.repo.findByProductVariantAndUnit(
        product_variant.id,
        unit.id,
      );
      if (existing) throw new BadRequestException('Product Point already exists');
    }

    const point = await this.pointRepo.findByNameCode(PointNameCode.PRODUCT);
    if (!point) throw new BadRequestException('Point config not found');

    const points_per_unit = 1 * point.points_multiplier;

    const entity = new ProductPoint({
      product_variant,
      unit,
      points_per_unit,
      is_active: dto.is_active ?? true,
      effective_date: new Date(dto.effective_date),
    });

    return this.repo.create(entity);
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductPoint } from '../../domain/product_point.entity';
import { UpdateProductPointDto } from '../../dto/update-ProductPoint.dto';
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

@Injectable()
export class UpdateProductPointUseCase {
  constructor(
    @Inject(PRODUCT_POINT_REPOSITORY)
    private readonly repo: IProductPointRepository,

    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,

    @Inject(UNIT_REPOSITORY)
    private readonly unitRepo: IUnitRepository,
  ) {}

  async execute(id: number, dto: UpdateProductPointDto): Promise<ProductPoint> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new BadRequestException('ProductPoint not found');

    const product_variant = await this.productVariantRepo.findById(
      dto.product_variant_id,
    );
    if (!product_variant)
      throw new BadRequestException('Product Variant not found');

    const unit = await this.unitRepo.findById(dto.unit_id);
    if (!unit) throw new BadRequestException('Unit not found');

    existing.product_variant = product_variant;
    existing.unit = unit;
    existing.points_per_unit = dto.points_per_unit ?? existing.points_per_unit;
    existing.effective_date = new Date(dto.effective_date);

    return this.repo.update(existing);
  }
}

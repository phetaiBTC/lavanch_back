import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
import { UpdateProductVariantDto } from '../../dto/update-ProductVariant.dto';
import { PRODUCT_REPOSITORY, type IProductRepository } from 'src/modules/product/domain/product.repository';
import { ActiveDto } from 'src/shared/dto/avtive.dto';

@Injectable()
export class ActiveProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,
  ) {}

  async execute(id: number, dto: ActiveDto): Promise<ProductVariant> {
    const existingVariant = await this.productVariantRepo.findById(id);
    if (!existingVariant) throw new BadRequestException('Product Variant not found');
    if (dto.is_active !== undefined) existingVariant.is_active = dto.is_active;
    return this.productVariantRepo.update(existingVariant);
  }
}

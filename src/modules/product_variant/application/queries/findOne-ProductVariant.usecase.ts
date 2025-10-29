import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
@Injectable()
export class FindOneProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly product_variantRepo: IProductVariantRepository,
  ) {}
  async execute(id: number): Promise<ProductVariant> {
    const product_variant = await this.product_variantRepo.findById(id);
    if (!product_variant)
      throw new NotFoundException('ProductVariant not found');
    return product_variant;
  }
}

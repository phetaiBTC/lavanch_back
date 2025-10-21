import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
@Injectable()
export class SoftDeleteProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly product_variantRepo: IProductVariantRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const product_variant = await this.product_variantRepo.findById(id);
    if (!product_variant)
      throw new NotFoundException('ProductVariant not found');
    return this.product_variantRepo.softDelete(id);
  }
}

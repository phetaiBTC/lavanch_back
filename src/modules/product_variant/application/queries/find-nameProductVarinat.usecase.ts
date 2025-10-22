import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
@Injectable()
export class FindNameProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,
  ) {}
  async execute(name: string): Promise<ProductVariant> {
    const productVariant = await this.productVariantRepo.findByName(name);
    if (!productVariant) {
      throw new NotFoundException('ProductVariant not found');
    }
    return productVariant;
  }
}

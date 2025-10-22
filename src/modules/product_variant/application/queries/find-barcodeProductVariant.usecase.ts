import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
@Injectable()
export class FindBarcodeProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,
  ) {}
  async execute(barcode: string): Promise<ProductVariant> {
    const productVariant = await this.productVariantRepo.findByBarcode(barcode);
    if (!productVariant) {
      throw new NotFoundException('ProductVariant Barcode not found');
    }
    return productVariant;
  }
}

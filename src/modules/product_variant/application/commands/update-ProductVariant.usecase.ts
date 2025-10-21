import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
import { UpdateProductVariantDto } from '../../dto/update-ProductVariant.dto';
import { PRODUCT_REPOSITORY, type IProductRepository } from 'src/modules/product/domain/product.repository';

@Injectable()
export class UpdateProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,

    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
  ) {}

  async execute(id: number, dto: UpdateProductVariantDto): Promise<ProductVariant> {
    const existingVariant = await this.productVariantRepo.findById(id);
    if (!existingVariant) throw new BadRequestException('Product Variant not found');

    if (dto.productId) {
      const product = await this.productRepo.findById(dto.productId);
      if (!product) throw new BadRequestException('Product not found');
      existingVariant.product = product;
    }

    if (dto.name !== undefined) existingVariant.name = dto.name;
    if (dto.sku !== undefined) existingVariant.sku = dto.sku;
    if (dto.barcode !== undefined) existingVariant.barcode = dto.barcode;

    return this.productVariantRepo.update(existingVariant);
  }
}

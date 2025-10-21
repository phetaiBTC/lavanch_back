import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
import { CreateProductVariantDto } from '../../dto/create-ProductVariant.dto';
import  { type IProductRepository, PRODUCT_REPOSITORY } from 'src/modules/product/domain/product.repository';
@Injectable()
export class CreateProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly product_variantRepo: IProductVariantRepository,

    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
  ) {}
  async execute(dto: CreateProductVariantDto): Promise<ProductVariant> {
    const product = await this.productRepo.findById(dto.productId);
    if (!product) throw new BadRequestException('Product not found');

    if (!product.is_active)
      throw new BadRequestException('Product is not active');

    const productVariant = new ProductVariant({
      name: dto.name,
      sku: dto.sku,
      barcode: dto.barcode,
      product : product,
      is_active: dto.is_active ?? true,
    });

    return this.product_variantRepo.create(productVariant);
  }
}

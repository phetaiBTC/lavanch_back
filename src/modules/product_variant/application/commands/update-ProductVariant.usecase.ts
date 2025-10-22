import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
import { UpdateProductVariantDto } from '../../dto/update-ProductVariant.dto';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from 'src/modules/product/domain/product.repository';
import { UniqueValidatorService } from 'src/shared/utils/pass.notfound.util';
import { FindOneProductVariantUseCase } from '../queries/findOne-ProductVariant.usecase';
import { FindNameProductVariantUseCase } from '../queries/find-nameProductVarinat.usecase';
import { FindBarcodeProductVariantUseCase } from '../queries/find-barcodeProductVariant.usecase';
import { FindOneProductUseCase } from 'src/modules/product/application/queries/findOne-Product.usecase';
import { Product } from 'src/modules/product/domain/product.entity';

@Injectable()
export class UpdateProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,

    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
    private readonly usecaseFindProduct: FindOneProductUseCase,
    private readonly validateUniqueField: UniqueValidatorService,
    private readonly FindOneProductVariantUseCase: FindOneProductVariantUseCase,
    private readonly usecaseFindNameProductVariant: FindNameProductVariantUseCase,
    private readonly usecaseFindBarcodeProductVariant: FindBarcodeProductVariantUseCase,
  ) {}

  async execute(
    id: number,
    dto: UpdateProductVariantDto,
  ): Promise<ProductVariant> {
    const product = await this.validation_product(dto);
    const existingVariant = await this.validation_product_variant(id, dto);
    existingVariant.value.product = product ?? existingVariant.value.product;
    return this.productVariantRepo.save(existingVariant);
  }

  private async validation_product_variant(
    id: number,
    dto: UpdateProductVariantDto,
  ) {
    const name = dto.name;
    const barcode = dto.barcode;

    if (name) {
      await this.validateUniqueField.validateUniqueField(async () => {
        const variant = await this.usecaseFindNameProductVariant.execute(name);
        return variant?.value.id === id ? undefined : variant;
      }, 'Product Variant name already exists');
    }

    if (barcode) {
      await this.validateUniqueField.validateUniqueField(async () => {
        const variant =
          await this.usecaseFindBarcodeProductVariant.execute(barcode);
        return variant?.value.id === id ? undefined : variant;
      }, 'Product Variant barcode already exists');
    }

    const existingVariant = await this.FindOneProductVariantUseCase.execute(id);
    if (dto.name !== undefined) existingVariant.value.name = dto.name;
    if (dto.sku !== undefined) existingVariant.value.sku = dto.sku;
    if (dto.barcode !== undefined) existingVariant.value.barcode = dto.barcode;

    return existingVariant;
  }
  private async validation_product(
    dto: UpdateProductVariantDto,
  ): Promise<Product | null> {
    if (dto.productId) {
      const result = await this.usecaseFindProduct.execute(dto.productId);
      if (!result.value.is_active) {
        throw new BadRequestException('Product is not active');
      }
      return result;
    }

    return null;
  }
}

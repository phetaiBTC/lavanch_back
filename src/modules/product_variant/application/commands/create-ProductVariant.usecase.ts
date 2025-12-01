import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
import { CreateProductVariantDto } from '../../dto/create-ProductVariant.dto';
import { FindOneProductUseCase } from 'src/modules/product/application/queries/findOne-Product.usecase';
import { FindNameProductVariantUseCase } from '../queries/find-nameProductVarinat.usecase';
import { FindBarcodeProductVariantUseCase } from '../queries/find-barcodeProductVariant.usecase';
import { UniqueValidatorService } from 'src/shared/utils/pass.notfound.util';
@Injectable()
export class CreateProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly product_variantRepo: IProductVariantRepository,
    private readonly validateUniqueField: UniqueValidatorService,
    private readonly usecaseFindProduct: FindOneProductUseCase,
    private readonly usecaseFindNameProductVariant: FindNameProductVariantUseCase,
    private readonly usecaseFindBarcodeProductVariant: FindBarcodeProductVariantUseCase,
  ) {}
  async execute(dto: CreateProductVariantDto): Promise<ProductVariant> {
    const product = await this.validation_product(dto.productId);
    await this.validation_product_variant(dto);
    return this.product_variantRepo.save(
      new ProductVariant({ ...dto, product }),
    );
  }

  private validation_product = async (prodcut_id: number) => {
    const product = await this.usecaseFindProduct.execute(prodcut_id);
    if (!product.value.is_active)
      throw new BadRequestException('Product is not active');
    return product;
  };

  private async validation_product_variant(dto: CreateProductVariantDto) {
    await this.validateUniqueField.validateUniqueField(
      () => this.usecaseFindNameProductVariant.execute(dto.name),
      'Product Variant name already exists',
    );
    await this.validateUniqueField.validateUniqueField(
      () => this.usecaseFindBarcodeProductVariant.execute(dto.barcode),
      'Product Variant barcode already exists',
    );
  }
}

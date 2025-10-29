import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '../../domain/product.repository';
import { Product } from '../../domain/product.entity';
import { CreateProductDto } from '../../dto/create-Product.dto';
import { FindOneCategoryUseCase } from 'src/modules/category/application/queries/findOne-Category.usecase';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,

    private readonly usecaseFindOneCategory: FindOneCategoryUseCase,
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const categoryDomain = await this.usecaseFindOneCategory.execute(
      dto.categoryId,
    );
    await this.validation_product(dto);
    return this.productRepo.save(
      new Product({
        ...dto,
        category: categoryDomain,
      }),
    );
  }

  async validation_product(dto: CreateProductDto) {
    const existingProduct = await this.productRepo.findName(dto.name);
    if (existingProduct)
      throw new BadRequestException('Product nam already exists');
    if (dto.barcode) {
      const existingBarcode = await this.productRepo.findByBarcode(dto.barcode);
      if (existingBarcode)
        throw new BadRequestException('Product Barcode already exists');
    }
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '../../domain/product.repository';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from 'src/modules/category/domain/category.repository';
import { Product } from '../../domain/product.entity';
import { CreateProductDto } from '../../dto/create-Product.dto';
import { CategoryMapper } from 'src/modules/category/infrastructure/category.mapper';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const categoryDomain = await this.categoryRepo.findById(dto.categoryId);
    if (!categoryDomain) throw new BadRequestException('Category not found');

    const existingProduct = await this.productRepo.findName(dto.name);
    if(existingProduct) throw new BadRequestException('Product nam already exists');

    if (dto.barcode) {
      const existingBarcode = await this.productRepo.findByBarcode(dto.barcode);
      if (existingBarcode) throw new BadRequestException('Product Barcode already exists');
    }

    const product = new Product({
      name: dto.name,
      brand: dto.brand,
      category: categoryDomain,
      description: dto.description,
      barcode: dto.barcode,
      is_active: dto.is_active ?? true,
    });

    return this.productRepo.create(product);
  }
}

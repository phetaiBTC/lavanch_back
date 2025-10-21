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
import { UpdateProductDto } from '../../dto/update-Product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepo.findById(id);
    if (!product) throw new BadRequestException('Product not found');

    let categoryDomain = product.category;
    if (dto.categoryId) {
      const category = await this.categoryRepo.findById(dto.categoryId);
      if (!category) throw new BadRequestException('Category not found');
      categoryDomain = category;
    }

    if (dto.name && dto.name !== product.name) {
      const existingName = await this.productRepo.findName(dto.name);
      if (existingName) throw new BadRequestException('Product name already exists');
    }

    if (dto.barcode && dto.barcode !== product.barcode) {
      const existingBarcode = await this.productRepo.findByBarcode(dto.barcode);
      if (existingBarcode) throw new BadRequestException('Product barcode already exists');
    }

    const updatedProduct = new Product({
      ...product,
      name: dto.name ?? product.name,
      brand: dto.brand ?? product.brand,
      category: categoryDomain,
      description: dto.description ?? product.description,
      barcode: dto.barcode ?? product.barcode,
      id: product.id
    });

    return this.productRepo.update(updatedProduct);
  }
}

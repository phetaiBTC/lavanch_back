import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '../../domain/product.repository';
import { Product } from '../../domain/product.entity';
@Injectable()
export class FindOneProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
  ) {}
  async execute(id: number): Promise<Product> {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}

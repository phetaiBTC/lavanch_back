import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '../../domain/product.repository';
import { FindOneProductUseCase } from '../queries/findOne-Product.usecase';
@Injectable()
export class SoftDeleteProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
    private readonly usecaseFindProduct: FindOneProductUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.usecaseFindProduct.execute(id)));
    return this.productRepo.softDelete(id);
  }
}

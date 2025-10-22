import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '../../domain/product.repository';
@Injectable()
export class RestoreProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const product = await this.productRepo.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return this.productRepo.restore(id);
  }
}

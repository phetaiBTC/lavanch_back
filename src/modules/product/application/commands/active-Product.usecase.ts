import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '../../domain/product.repository';
import { Product } from '../../domain/product.entity';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
import { FindOneProductUseCase } from '../queries/findOne-Product.usecase';

@Injectable()
export class ActiveProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,

    private readonly usecaseFindProduct: FindOneProductUseCase,
  ) {}
  async execute(id: number, dto: ActiveDto): Promise<Product> {
    const product = await this.usecaseFindProduct.execute(id);
    product.update({ is_active: dto.is_active });
    return this.productRepo.save(product);
  }
}

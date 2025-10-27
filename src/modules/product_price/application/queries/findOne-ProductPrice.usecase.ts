import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_PRICE_REPOSITORY,
  type IProductPriceRepository,
} from '../../domain/product_price.repository';
import { ProductPrice } from '../../domain/product_price.entity';
@Injectable()
export class FindOneProductPriceUseCase {
  constructor(
    @Inject(PRODUCT_PRICE_REPOSITORY)
    private readonly product_priceRepo: IProductPriceRepository,
  ) {}
  async execute(id: number): Promise<ProductPrice> {
    const product_price = await this.product_priceRepo.findById(id);
    if (!product_price) throw new NotFoundException('ProductPrice not found');
    return product_price;
  }
}

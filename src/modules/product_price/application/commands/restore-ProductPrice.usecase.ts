import { NotFoundException, Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_PRICE_REPOSITORY,
  type IProductPriceRepository,
} from '../../domain/product_price.repository';
import { FindOneProductPriceUseCase } from '../queries/findOne-ProductPrice.usecase';
@Injectable()
export class RestoreProductPriceUseCase {
  constructor(
    @Inject(PRODUCT_PRICE_REPOSITORY)
    private readonly product_priceRepo: IProductPriceRepository,

    private readonly usecaseFindOneProductPrice: FindOneProductPriceUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    // await this.usecaseFindOneProductPrice.execute(id);
    await Promise.all(id.map((id) => this.usecaseFindOneProductPrice.execute(id)));

    return this.product_priceRepo.restore(id);
  }
}

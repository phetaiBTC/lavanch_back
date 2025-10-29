import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_PRICE_REPOSITORY,
  type IProductPriceRepository,
} from '../../domain/product_price.repository';
import { ProductPrice } from '../../domain/product_price.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllProductPriceUseCase {
  constructor(
    @Inject(PRODUCT_PRICE_REPOSITORY)
    private readonly product_priceRepo: IProductPriceRepository,
  ) {}
  async execute(
    query: PaginationDto,
  ): Promise<PaginatedResponse<ProductPrice>> {
    return await this.product_priceRepo.findAll(query);
  }
}

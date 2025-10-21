import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '../../domain/product.repository';
import { Product } from '../../domain/product.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: IProductRepository,
  ) {}
  async execute(query: PaginationDto): Promise<PaginatedResponse<Product>> {
    return await this.productRepo.findAll(query);
  }
}

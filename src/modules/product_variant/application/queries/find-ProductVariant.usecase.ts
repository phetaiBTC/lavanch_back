import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly product_variantRepo: IProductVariantRepository,
  ) {}
  async execute(
    query: PaginationDto,
  ): Promise<PaginatedResponse<ProductVariant>> {
    const joins = [{ relation: 'product_variant.product', as: 'product' }];
    return await this.product_variantRepo.findAll(query, joins);
  }
}

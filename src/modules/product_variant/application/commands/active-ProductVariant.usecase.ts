import {Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { ProductVariant } from '../../domain/product_variant.entity';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
import { FindOneProductVariantUseCase } from '../queries/findOne-ProductVariant.usecase';

@Injectable()
export class ActiveProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepo: IProductVariantRepository,

    private readonly usecaseFindProductVariant: FindOneProductVariantUseCase,
  ) {}

  async execute(id: number, dto: ActiveDto): Promise<ProductVariant> {
    const existingVariant = await this.usecaseFindProductVariant.execute(id);
    if (dto.is_active) existingVariant.activate(dto.is_active); ;
    return this.productVariantRepo.save(existingVariant);
  }
}

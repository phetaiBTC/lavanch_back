import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/product_variant.repository';
import { FindOneProductVariantUseCase } from '../queries/findOne-ProductVariant.usecase';
@Injectable()
export class SoftDeleteProductVariantUseCase {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly product_variantRepo: IProductVariantRepository,
    private readonly FindOneProductVariantUseCase: FindOneProductVariantUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.FindOneProductVariantUseCase.execute(id)));
    // await this.FindOneProductVariantUseCase.execute(id);
    return this.product_variantRepo.softDelete(id);
  }
}

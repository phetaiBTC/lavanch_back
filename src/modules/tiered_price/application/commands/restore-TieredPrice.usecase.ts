import { NotFoundException, Inject, Injectable } from '@nestjs/common';
import {
  TIERED_PRICE_REPOSITORY,
  type ITieredPriceRepository,
} from '../../domain/tiered_price.repository';
import { FindOneTieredPriceUseCase } from '../queries/findOne-TieredPrice.usecase';
@Injectable()
export class RestoreTieredPriceUseCase {
  constructor(
    @Inject(TIERED_PRICE_REPOSITORY)
    private readonly tiered_priceRepo: ITieredPriceRepository,
    private readonly usecaseFindOneTieredPrice: FindOneTieredPriceUseCase,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    await this.usecaseFindOneTieredPrice.execute(id);
    return this.tiered_priceRepo.restore(id);
  }
}

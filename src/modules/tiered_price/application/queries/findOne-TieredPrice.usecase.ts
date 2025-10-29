import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  TIERED_PRICE_REPOSITORY,
  type ITieredPriceRepository,
} from '../../domain/tiered_price.repository';
import { TieredPrice } from '../../domain/tiered_price.entity';
@Injectable()
export class FindOneTieredPriceUseCase {
  constructor(
    @Inject(TIERED_PRICE_REPOSITORY)
    private readonly tiered_priceRepo: ITieredPriceRepository,
  ) {}
  async execute(id: number): Promise<TieredPrice> {
    const tiered_price = await this.tiered_priceRepo.findById(id);
    if (!tiered_price) throw new NotFoundException('TieredPrice not found');
    return tiered_price;
  }
}

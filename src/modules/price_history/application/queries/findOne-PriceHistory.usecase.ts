import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRICE_HISTORY_REPOSITORY,
  type IPriceHistoryRepository,
} from '../../domain/price_history.repository';
import { PriceHistory } from '../../domain/price_history.entity';
@Injectable()
export class FindOnePriceHistoryUseCase {
  constructor(
    @Inject(PRICE_HISTORY_REPOSITORY)
    private readonly price_historyRepo: IPriceHistoryRepository,
  ) {}
  async execute(id: number): Promise<PriceHistory> {
    const price_history = await this.price_historyRepo.findById(id);
    if (!price_history) throw new NotFoundException('PriceHistory not found');
    return price_history;
  }
}

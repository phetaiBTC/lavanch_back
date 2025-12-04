import { NotFoundException, Inject, Injectable } from '@nestjs/common';
import {
  PRICE_HISTORY_REPOSITORY,
  type IPriceHistoryRepository,
} from '../../domain/price_history.repository';
import { FindOnePriceHistoryUseCase } from '../queries/findOne-PriceHistory.usecase';
@Injectable()
export class RestorePriceHistoryUseCase {
  constructor(
    @Inject(PRICE_HISTORY_REPOSITORY)
    private readonly price_historyRepo: IPriceHistoryRepository,

    private readonly findOnePriceHistory: FindOnePriceHistoryUseCase,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    await this.findOnePriceHistory.execute(id);
    return this.price_historyRepo.restore(id);
  }
}

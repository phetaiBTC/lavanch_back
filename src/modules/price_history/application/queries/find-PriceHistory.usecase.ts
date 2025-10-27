import { Inject, Injectable } from '@nestjs/common';
import {
  PRICE_HISTORY_REPOSITORY,
  type IPriceHistoryRepository,
} from '../../domain/price_history.repository';
import { PriceHistory } from '../../domain/price_history.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllPriceHistoryUseCase {
  constructor(
    @Inject(PRICE_HISTORY_REPOSITORY)
    private readonly price_historyRepo: IPriceHistoryRepository,
  ) {}
  async execute(
    query: PaginationDto,
  ): Promise<PaginatedResponse<PriceHistory>> {
    return await this.price_historyRepo.findAll(query);
  }
}

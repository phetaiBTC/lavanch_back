import { Inject, Injectable } from '@nestjs/common';
import {
  TIERED_PRICE_REPOSITORY,
  type ITieredPriceRepository,
} from '../../domain/tiered_price.repository';
import { TieredPrice } from '../../domain/tiered_price.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllTieredPriceUseCase {
  constructor(
    @Inject(TIERED_PRICE_REPOSITORY)
    private readonly tiered_priceRepo: ITieredPriceRepository,
  ) {}
  async execute(query: PaginationDto): Promise<PaginatedResponse<TieredPrice>> {
    return await this.tiered_priceRepo.findAll(query);
  }
}


  
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENTS_REPOSITORY,
    type IStock_adjustmentsRepository,
  } from '../../domain/stock_adjustments.repository';
  import { Stock_adjustments } from '../../domain/stock_adjustments.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindStock_adjustmentsUseCase {
  constructor(
 @Inject(STOCK_ADJUSTMENTS_REPOSITORY)
      private readonly stock_adjustmentsRepository: IStock_adjustmentsRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Stock_adjustments>> {
    return await this.stock_adjustmentsRepository.findAll(query);
  }
}
  
  
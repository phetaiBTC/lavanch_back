
  
  import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_MOVEMENTS_REPOSITORY,
    type IStock_movementsRepository,
  } from '../../domain/stock_movements.repository';
  import { Stock_movements } from '../../domain/stock_movements.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Injectable()
export class FindStock_movementsUseCase {
  constructor(
 @Inject(STOCK_MOVEMENTS_REPOSITORY)
      private readonly stock_movementsRepository: IStock_movementsRepository,
  ) {}

  async execute(query: PaginationDto): Promise<PaginatedResponse<Stock_movements>> {
    return await this.stock_movementsRepository.findAll(query);
  }
}
  
  

  import { Inject, Injectable,NotFoundException } from '@nestjs/common';
  import {
    STOCK_MOVEMENTS_REPOSITORY,
    type IStock_movementsRepository,
  } from '../../domain/stock_movements.repository';
  import { Stock_movements } from '../../domain/stock_movements.entity';

@Injectable()
export class FindOneStock_movementsUseCase {
  constructor(
 @Inject(STOCK_MOVEMENTS_REPOSITORY)
      private readonly stock_movementsRepository: IStock_movementsRepository,
  ) {}

  async execute(id: number): Promise<Stock_movements> {
    const stock_movements = await this.stock_movementsRepository.findById(id);
    if (!stock_movements) {
      throw new NotFoundException('Stock_movements not found');
    }
    return stock_movements;
  }
}
  
  
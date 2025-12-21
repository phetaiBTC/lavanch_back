
import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_MOVEMENTS_REPOSITORY,
    type IStock_movementsRepository,
  } from '../../domain/stock_movements.repository';
import { FindOneStock_movementsUseCase } from '../queries/findOne-stock_movements.usecase';


@Injectable()
export class RestoreStock_movementsUseCase {
  constructor(
      @Inject(STOCK_MOVEMENTS_REPOSITORY)
      private readonly stock_movementsRepository: IStock_movementsRepository,
      private readonly stock_movementsGetOne: FindOneStock_movementsUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.stock_movementsGetOne.execute(id)));
    return await this.stock_movementsRepository.restore(id);
  }
}
  
  
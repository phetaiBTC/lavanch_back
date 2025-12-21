
import { Inject, Injectable } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENTS_REPOSITORY,
    type IStock_adjustmentsRepository,
  } from '../../domain/stock_adjustments.repository';
import { FindOneStock_adjustmentsUseCase } from '../queries/findOne-stock_adjustments.usecase';


@Injectable()
export class RestoreStock_adjustmentsUseCase {
  constructor(
      @Inject(STOCK_ADJUSTMENTS_REPOSITORY)
      private readonly stock_adjustmentsRepository: IStock_adjustmentsRepository,
      private readonly stock_adjustmentsGetOne: FindOneStock_adjustmentsUseCase,
  ) {}

  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.stock_adjustmentsGetOne.execute(id)));
    return await this.stock_adjustmentsRepository.restore(id);
  }
}
  
  
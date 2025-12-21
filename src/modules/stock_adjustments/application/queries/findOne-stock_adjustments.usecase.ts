
  import { Inject, Injectable,NotFoundException } from '@nestjs/common';
  import {
    STOCK_ADJUSTMENTS_REPOSITORY,
    type IStock_adjustmentsRepository,
  } from '../../domain/stock_adjustments.repository';
  import { Stock_adjustments } from '../../domain/stock_adjustments.entity';

@Injectable()
export class FindOneStock_adjustmentsUseCase {
  constructor(
 @Inject(STOCK_ADJUSTMENTS_REPOSITORY)
      private readonly stock_adjustmentsRepository: IStock_adjustmentsRepository,
  ) {}

  async execute(id: number): Promise<Stock_adjustments> {
    const stock_adjustments = await this.stock_adjustmentsRepository.findById(id);
    if (!stock_adjustments) {
      throw new NotFoundException('Stock_adjustments not found');
    }
    return stock_adjustments;
  }
}
  
  
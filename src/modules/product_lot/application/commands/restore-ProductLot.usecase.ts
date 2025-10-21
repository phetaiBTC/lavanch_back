import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_LOT_REPOSITORY,
  type IProductLotRepository,
} from '../../domain/product_lot.repository';
@Injectable()
export class RestoreProductLotUseCase {
  constructor(
    @Inject(PRODUCT_LOT_REPOSITORY)
    private readonly product_lotRepo: IProductLotRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const product_lot = await this.product_lotRepo.findById(id);
    if (!product_lot) throw new NotFoundException('ProductLot not found');
    return this.product_lotRepo.restore(id);
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_LOT_REPOSITORY,
  type IProductLotRepository,
} from '../../domain/product_lot.repository';
import { FindOneProductLotUseCase } from '../queries/findOne-ProductLot.usecase';
@Injectable()
export class HardDeleteProductLotUseCase {
  constructor(
    @Inject(PRODUCT_LOT_REPOSITORY)
    private readonly product_lotRepo: IProductLotRepository,
    private readonly usecaseFIndOneProductLot: FindOneProductLotUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    await Promise.all(id.map((id) => this.usecaseFIndOneProductLot.execute(id)));
    return this.product_lotRepo.hardDelete(id);
  }
}

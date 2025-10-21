import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_LOT_REPOSITORY,
  type IProductLotRepository,
} from '../../domain/product_lot.repository';
import { ProductLot } from '../../domain/product_lot.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllProductLotUseCase {
  constructor(
    @Inject(PRODUCT_LOT_REPOSITORY)
    private readonly product_lotRepo: IProductLotRepository,
  ) {}
  async execute(query: PaginationDto): Promise<PaginatedResponse<ProductLot>> {
    return await this.product_lotRepo.findAll(query);
  }
}

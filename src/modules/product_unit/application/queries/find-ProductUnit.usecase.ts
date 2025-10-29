import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_UNIT_REPOSITORY,
  type IProductUnitRepository,
} from '../../domain/product_unit.repository';
import { ProductUnit } from '../../domain/product_unit.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly product_unitRepo: IProductUnitRepository,
  ) {}
  async execute(query: PaginationDto): Promise<PaginatedResponse<ProductUnit>> {
    return await this.product_unitRepo.findAll(query);
  }
}

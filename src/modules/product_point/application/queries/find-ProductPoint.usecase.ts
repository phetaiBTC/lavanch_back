import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_POINT_REPOSITORY,
  type IProductPointRepository,
} from '../../domain/product_point.repository';
import { ProductPoint } from '../../domain/product_point.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Injectable()
export class FindAllProductPointUseCase {
  constructor(
    @Inject(PRODUCT_POINT_REPOSITORY)
    private readonly product_pointRepo: IProductPointRepository,
  ) {}
  async execute(
    query: PaginationDto,
  ): Promise<PaginatedResponse<ProductPoint>> {
    return await this.product_pointRepo.findAll(query);
  }
}

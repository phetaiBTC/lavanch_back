import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_POINT_REPOSITORY,
  type IProductPointRepository,
} from '../../domain/product_point.repository';
import { ProductPoint } from '../../domain/product_point.entity';
@Injectable()
export class FindOneProductPointUseCase {
  constructor(
    @Inject(PRODUCT_POINT_REPOSITORY)
    private readonly product_pointRepo: IProductPointRepository,
  ) {}
  async execute(id: number): Promise<ProductPoint> {
    const product_point = await this.product_pointRepo.findById(id);
    if (!product_point) throw new NotFoundException('ProductPoint not found');
    return product_point;
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_POINT_REPOSITORY,
  type IProductPointRepository,
} from '../../domain/product_point.repository';
import { FindOneProductPointUseCase } from '../queries/findOne-ProductPoint.usecase';
@Injectable()
export class HardDeleteProductPointUseCase {
  constructor(
    @Inject(PRODUCT_POINT_REPOSITORY)
    private readonly product_pointRepo: IProductPointRepository,
    private readonly usecaseFIndOneProductPoint: FindOneProductPointUseCase,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    await this.usecaseFIndOneProductPoint.execute(id);
    return this.product_pointRepo.hardDelete(id);
  }
}

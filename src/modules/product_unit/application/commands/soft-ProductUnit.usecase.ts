import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_UNIT_REPOSITORY,
  type IProductUnitRepository,
} from '../../domain/product_unit.repository';
import { ProductUnit } from '../../domain/product_unit.entity';
import { CreateProductUnitDto } from '../../dto/create-ProductUnit.dto';
import { FindOneProductUnitUseCase } from '../queries/findOne-ProductUnit.usecase';
@Injectable()
export class SoftDeleteProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly product_unitRepo: IProductUnitRepository,
    private readonly usecaseFIndOneProductUnit: FindOneProductUnitUseCase,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    await this.usecaseFIndOneProductUnit.execute(id);
    return this.product_unitRepo.softDelete(id);
  }
}

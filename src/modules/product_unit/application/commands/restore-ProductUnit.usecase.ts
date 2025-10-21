import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_UNIT_REPOSITORY,
  type IProductUnitRepository,
} from '../../domain/product_unit.repository';
import { ProductUnit } from '../../domain/product_unit.entity';
import { CreateProductUnitDto } from '../../dto/create-ProductUnit.dto';
@Injectable()
export class RestoreProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly product_unitRepo: IProductUnitRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const product_unit = await this.product_unitRepo.findById(id);
    if (!product_unit) throw new NotFoundException('ProductUnit not found');
    return this.product_unitRepo.restore(id);
  }
}

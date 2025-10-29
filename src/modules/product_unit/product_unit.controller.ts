import { Controller } from '@nestjs/common';
import { ProductUnit } from './domain/product_unit.entity';
import { ProductUnitResponse } from './interface/product_unit.interface';
import { CreateProductUnitDto } from './dto/create-ProductUnit.dto';
import { UpdateProductUnitDto } from './dto/update-ProductUnit.dto';
import { ProductUnitMapper } from './infrastructure/product_unit.mapper';
import { CreateProductUnitUseCase } from './application/commands/create-ProductUnit.usecase';
import { UpdateProductUnitUseCase } from './application/commands/update-ProductUnit.usecase';
import { FindOneProductUnitUseCase } from './application/queries/findOne-ProductUnit.usecase';
import { FindAllProductUnitUseCase } from './application/queries/find-ProductUnit.usecase';
import { HardDeleteProductUnitUseCase } from './application/commands/hard-ProductUnit.usecase';
import { SoftDeleteProductUnitUseCase } from './application/commands/soft-ProductUnit.usecase';
import { RestoreProductUnitUseCase } from './application/commands/restore-ProductUnit.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { ProductUnitOrm } from 'src/database/typeorm/product-unit.orm-entity';

@Controller('product_unit')
export class ProductUnitController extends BaseController<
  ProductUnit,
  ProductUnitOrm,
  ProductUnitResponse,
  CreateProductUnitDto,
  UpdateProductUnitDto
> {
  constructor(
    createProductUnitUseCase: CreateProductUnitUseCase,
    updateProductUnitUseCase: UpdateProductUnitUseCase,
    findOneProductUnitUseCase: FindOneProductUnitUseCase,
    findAllProductUnitUseCase: FindAllProductUnitUseCase,
    hardDeleteProductUnitUseCase: HardDeleteProductUnitUseCase,
    softDeleteProductUnitUseCase: SoftDeleteProductUnitUseCase,
    restoreProductUnitUseCase: RestoreProductUnitUseCase,
  ) {
    super(
      ProductUnitMapper,
      createProductUnitUseCase,
      updateProductUnitUseCase,
      findOneProductUnitUseCase,
      findAllProductUnitUseCase,
      hardDeleteProductUnitUseCase,
      softDeleteProductUnitUseCase,
      restoreProductUnitUseCase,
    );
  }
}

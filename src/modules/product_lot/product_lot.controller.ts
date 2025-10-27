import { Controller } from '@nestjs/common';
import { ProductLot } from './domain/product_lot.entity';
import { ProductLotOrm } from 'src/database/typeorm/product_lot.orm-entity';
import { ProductLotResponse } from './interface/product_lot.interface';
import { CreateProductLotDto } from './dto/create-ProductLot.dto';
import { UpdateProductLotDto } from './dto/update-ProductLot.dto';
import { ProductLotMapper } from './infrastructure/product_lot.mapper';
import { CreateProductLotUseCase } from './application/commands/create-ProductLot.usecase';
import { UpdateProductLotUseCase } from './application/commands/update-ProductLot.usecase';
import { FindOneProductLotUseCase } from './application/queries/findOne-ProductLot.usecase';
import { FindAllProductLotUseCase } from './application/queries/find-ProductLot.usecase';
import { HardDeleteProductLotUseCase } from './application/commands/hard-ProductLot.usecase';
import { SoftDeleteProductLotUseCase } from './application/commands/soft-ProductLot.usecase';
import { RestoreProductLotUseCase } from './application/commands/restore-ProductLot.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';

@Controller('product_lot')
export class ProductLotController extends BaseController<
  ProductLot,
  ProductLotOrm,
  ProductLotResponse,
  CreateProductLotDto,
  UpdateProductLotDto
> {
  constructor(
    createProductLotUseCase: CreateProductLotUseCase,
    updateProductLotUseCase: UpdateProductLotUseCase,
    findOneProductLotUseCase: FindOneProductLotUseCase,
    findAllProductLotUseCase: FindAllProductLotUseCase,
    hardDeleteProductLotUseCase: HardDeleteProductLotUseCase,
    softDeleteProductLotUseCase: SoftDeleteProductLotUseCase,
    restoreProductLotUseCase: RestoreProductLotUseCase,
  ) {
    super(
      ProductLotMapper,
      createProductLotUseCase,
      updateProductLotUseCase,
      findOneProductLotUseCase,
      findAllProductLotUseCase,
      hardDeleteProductLotUseCase,
      softDeleteProductLotUseCase,
      restoreProductLotUseCase,
    );
  }
}

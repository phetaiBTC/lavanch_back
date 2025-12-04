import { Controller } from '@nestjs/common';
import { CreateProductPriceDto } from './dto/create-ProductPrice.dto';
import { UpdateProductPriceDto } from './dto/update-ProductPrice.dto';
import { CreateProductPriceUseCase } from './application/commands/create-ProductPrice.usecase';
import { UpdateProductPriceUseCase } from './application/commands/update-ProductPrice.usecase';
import { HardDeleteProductPriceUseCase } from './application/commands/hard-ProductPrice.usecase';
import { SoftDeleteProductPriceUseCase } from './application/commands/soft-ProductPrice.usecase';
import { RestoreProductPriceUseCase } from './application/commands/restore-ProductPrice.usecase';
import { FindOneProductPriceUseCase } from './application/queries/findOne-ProductPrice.usecase';
import { FindAllProductPriceUseCase } from './application/queries/find-ProductPrice.usecase';
import { ProductPriceMapper } from './infrastructure/product_price.mapper';
import { ProductPriceResponse } from './interface/product_price.interface';
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { ProductPrice } from './domain/product_price.entity';
import { ProductPriceOrm } from 'src/database/typeorm/product_price.orm-entity';
@Controller('product_price')
export class ProductPriceController extends BaseController<
  ProductPrice,
  ProductPriceOrm,
  ProductPriceResponse,
  CreateProductPriceDto,
  UpdateProductPriceDto
> {
  constructor(
    protected readonly createProductPriceUseCase: CreateProductPriceUseCase,
    protected readonly updateProductPriceUseCase: UpdateProductPriceUseCase,
    protected readonly hardDeleteProductPriceUseCase: HardDeleteProductPriceUseCase,
    protected readonly softDeleteProductPriceUseCase: SoftDeleteProductPriceUseCase,
    protected readonly restoreProductPriceUseCase: RestoreProductPriceUseCase,
    protected readonly findOneProductPriceUseCase: FindOneProductPriceUseCase,
    protected readonly findAllProductPriceUseCase: FindAllProductPriceUseCase,
  ) {
    super(
      ProductPriceMapper,
      createProductPriceUseCase,
      updateProductPriceUseCase,
      findOneProductPriceUseCase,
      findAllProductPriceUseCase,
      hardDeleteProductPriceUseCase,
      softDeleteProductPriceUseCase,
      restoreProductPriceUseCase,
    );
  }
}

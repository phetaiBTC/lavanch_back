import { Controller, Patch, Body, Param } from '@nestjs/common';
import { Product } from './domain/product.entity';
import { ProductOrm } from 'src/database/typeorm/product.orm-entity';
import { ProductResponse } from './interface/product.interface';
import { CreateProductDto } from './dto/create-Product.dto';
import { UpdateProductDto } from './dto/update-Product.dto';
import { ProductMapper } from './infrastructure/product.mapper';
import { CreateProductUseCase } from './application/commands/create-Product.usecase';
import { UpdateProductUseCase } from './application/commands/update-Product.usecase';
import { FindOneProductUseCase } from './application/queries/findOne-Product.usecase';
import { FindAllProductUseCase } from './application/queries/find-Product.usecase';
import { HardDeleteProductUseCase } from './application/commands/hard-Product.usecase';
import { SoftDeleteProductUseCase } from './application/commands/soft-Product.usecase';
import { RestoreProductUseCase } from './application/commands/restore-Product.usecase';
import { ActiveProductUseCase } from './application/commands/active-Product.usecase';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
import { BaseController } from 'src/shared/BaseModule/BaseController';

@Controller('product')
export class ProductController extends BaseController<
  Product,
  ProductOrm,
  ProductResponse,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    createProductUseCase: CreateProductUseCase,
    updateProductUseCase: UpdateProductUseCase,
    findOneProductUseCase: FindOneProductUseCase,
    findAllProductUseCase: FindAllProductUseCase,
    hardDeleteProductUseCase: HardDeleteProductUseCase,
    softDeleteProductUseCase: SoftDeleteProductUseCase,
    restoreProductUseCase: RestoreProductUseCase,
    private readonly activeProductUseCase: ActiveProductUseCase, // custom
  ) {
    super(
      ProductMapper,
      createProductUseCase,
      updateProductUseCase,
      findOneProductUseCase,
      findAllProductUseCase,
      hardDeleteProductUseCase,
      softDeleteProductUseCase,
      restoreProductUseCase,
    );
  }

  @Patch('active-update/:id')
  async activeUpdate(
    @Param('id') id: number,
    @Body() dto: ActiveDto,
  ): Promise<ProductResponse> {
    return ProductMapper.toResponse(
      await this.activeProductUseCase.execute(id, dto),
    );
  }
}

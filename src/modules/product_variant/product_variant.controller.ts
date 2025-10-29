import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ProductVariant } from './domain/product_variant.entity';
import { ProductVariantResponse } from './interface/product_variant.interface';
import { CreateProductVariantDto } from './dto/create-ProductVariant.dto';
import { UpdateProductVariantDto } from './dto/update-ProductVariant.dto';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
import { ProductVariantMapper } from './infrastructure/product_variant.mapper';
import { CreateProductVariantUseCase } from './application/commands/create-ProductVariant.usecase';
import { UpdateProductVariantUseCase } from './application/commands/update-ProductVariant.usecase';
import { FindOneProductVariantUseCase } from './application/queries/findOne-ProductVariant.usecase';
import { FindAllProductVariantUseCase } from './application/queries/find-ProductVariant.usecase';
import { HardDeleteProductVariantUseCase } from './application/commands/hard-ProductVariant.usecase';
import { SoftDeleteProductVariantUseCase } from './application/commands/soft-ProductVariant.usecase';
import { RestoreProductVariantUseCase } from './application/commands/restore-ProductVariant.usecase';
import { ActiveProductVariantUseCase } from './application/commands/active-ProductVariant.usecase';
import { BaseController } from 'src/shared/BaseModule/BaseController';
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';

@Controller('product_variant')
export class ProductVariantController extends BaseController<
  ProductVariant,
  ProductVariantOrm,
  ProductVariantResponse,
  CreateProductVariantDto,
  UpdateProductVariantDto
> {
  constructor(
    createProductVariantUseCase: CreateProductVariantUseCase,
    updateProductVariantUseCase: UpdateProductVariantUseCase,
    findOneProductVariantUseCase: FindOneProductVariantUseCase,
    findAllProductVariantUseCase: FindAllProductVariantUseCase,
    hardDeleteProductVariantUseCase: HardDeleteProductVariantUseCase,
    softDeleteProductVariantUseCase: SoftDeleteProductVariantUseCase,
    restoreProductVariantUseCase: RestoreProductVariantUseCase,
    private readonly activeProductVariantUseCase: ActiveProductVariantUseCase, // custom
  ) {
    super(
      ProductVariantMapper,
      createProductVariantUseCase,
      updateProductVariantUseCase,
      findOneProductVariantUseCase,
      findAllProductVariantUseCase,
      hardDeleteProductVariantUseCase,
      softDeleteProductVariantUseCase,
      restoreProductVariantUseCase,
    );
  }

  // custom endpoint only for ProductVariant
  @Patch('active-update/:id')
  async activeUpdate(
    @Param('id') id: number,
    @Body() dto: ActiveDto,
  ): Promise<ProductVariantResponse> {
    return ProductVariantMapper.toResponse(
      await this.activeProductVariantUseCase.execute(id, dto),
    );
  }
}

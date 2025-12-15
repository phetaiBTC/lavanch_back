import { Controller, Patch, Param, Body, Post, Get } from '@nestjs/common';
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
import { ProductVariantOrm } from 'src/database/typeorm/product-variant.orm-entity';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('product_variant')
export class ProductVariantController extends BaseController<
  ProductVariant,
  ProductVariantOrm,
  ProductVariantResponse,
  CreateProductVariantDto,
  UpdateProductVariantDto
> {
  constructor(
    private readonly createProductVariantUseCase: CreateProductVariantUseCase,
    private readonly updateProductVariantUseCase: UpdateProductVariantUseCase,
    private readonly findAllProductVariantUseCase: FindAllProductVariantUseCase,
    private readonly activeProductVariantUseCase: ActiveProductVariantUseCase, // custom
    protected readonly findOneProductVariantUseCase: FindOneProductVariantUseCase,
    protected readonly hardDeleteProductVariantUseCase: HardDeleteProductVariantUseCase,
    protected readonly softDeleteProductVariantUseCase: SoftDeleteProductVariantUseCase,
    protected readonly restoreProductVariantUseCase: RestoreProductVariantUseCase,
  ) {
    super({
      mapper: ProductVariantMapper,
      findOne: findOneProductVariantUseCase,
      softDelete: softDeleteProductVariantUseCase,
      hardDelete: hardDeleteProductVariantUseCase,
      restore: restoreProductVariantUseCase,
    });
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

  @Post()
  override async create(
    dto: CreateProductVariantDto,
  ): Promise<ProductVariantResponse> {
    return ProductVariantMapper.toResponse(
      await this.createProductVariantUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    dto: UpdateProductVariantDto,
  ): Promise<ProductVariantResponse> {
    return ProductVariantMapper.toResponse(
      await this.updateProductVariantUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    query: PaginationDto,
  ): Promise<PaginatedResponse<ProductVariantResponse>> {
    return ProductVariantMapper.toResponseList(
      await this.findAllProductVariantUseCase.execute(query),
    );
  }
}

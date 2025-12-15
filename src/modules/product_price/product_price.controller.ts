import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
import { ProductPrice } from './domain/product_price.entity';
import { ProductPriceOrm } from 'src/database/typeorm/product_price.orm-entity';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
@Controller('product_price')
export class ProductPriceController extends BaseController<
  ProductPrice,
  ProductPriceOrm,
  ProductPriceResponse,
  CreateProductPriceDto,
  UpdateProductPriceDto
> {
  constructor(
    private readonly createProductPriceUseCase: CreateProductPriceUseCase,
    private readonly updateProductPriceUseCase: UpdateProductPriceUseCase,
    private readonly findAllProductPriceUseCase: FindAllProductPriceUseCase,
    protected readonly hardDeleteProductPriceUseCase: HardDeleteProductPriceUseCase,
    protected readonly softDeleteProductPriceUseCase: SoftDeleteProductPriceUseCase,
    protected readonly restoreProductPriceUseCase: RestoreProductPriceUseCase,
    protected readonly findOneProductPriceUseCase: FindOneProductPriceUseCase,
  ) {
    super({
      mapper: ProductPriceMapper,
      findOne: findOneProductPriceUseCase,
      hardDelete: hardDeleteProductPriceUseCase,
      softDelete: softDeleteProductPriceUseCase,
      restore: restoreProductPriceUseCase,
    });
  }
  @Post()
  override async create(
    @Body() dto: CreateProductPriceDto,
  ): Promise<ProductPriceResponse> {
    return ProductPriceMapper.toResponse(
      await this.createProductPriceUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductPriceDto,
  ): Promise<ProductPriceResponse> {
    return ProductPriceMapper.toResponse(
      await this.updateProductPriceUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<ProductPriceResponse>> {
    return ProductPriceMapper.toResponseList(
      await this.findAllProductPriceUseCase.execute(query),
    );
  }
}

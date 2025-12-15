import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
import { ProductUnitOrm } from 'src/database/typeorm/product-unit.orm-entity';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('product_unit')
export class ProductUnitController extends BaseController<
  ProductUnit,
  ProductUnitOrm,
  ProductUnitResponse,
  CreateProductUnitDto,
  UpdateProductUnitDto
> {
  constructor(
    private readonly createProductUnitUseCase: CreateProductUnitUseCase,
    private readonly updateProductUnitUseCase: UpdateProductUnitUseCase,
    private readonly findAllProductUnitUseCase: FindAllProductUnitUseCase,
    protected readonly findOneProductUnitUseCase: FindOneProductUnitUseCase,
    protected readonly hardDeleteProductUnitUseCase: HardDeleteProductUnitUseCase,
    protected readonly softDeleteProductUnitUseCase: SoftDeleteProductUnitUseCase,
    protected readonly restoreProductUnitUseCase: RestoreProductUnitUseCase,
  ) {
    super({
      mapper: ProductUnitMapper,
      hardDelete: hardDeleteProductUnitUseCase,
      softDelete: softDeleteProductUnitUseCase,
      restore: restoreProductUnitUseCase,
      findOne: findOneProductUnitUseCase,
    });
  }
  @Post()
  override async create(
    @Body() dto: CreateProductUnitDto,
  ): Promise<ProductUnitResponse> {
    return ProductUnitMapper.toResponse(
      await this.createProductUnitUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductUnitDto,
  ): Promise<ProductUnitResponse> {
    return ProductUnitMapper.toResponse(
      await this.updateProductUnitUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<ProductUnitResponse>> {
    return ProductUnitMapper.toResponseList(
      await this.findAllProductUnitUseCase.execute(query),
    );
  }
}

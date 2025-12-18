import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('product_lot')
export class ProductLotController extends BaseController<
  ProductLot,
  ProductLotOrm,
  ProductLotResponse,
  CreateProductLotDto,
  UpdateProductLotDto
> {
  constructor(
    private readonly createProductLotUseCase: CreateProductLotUseCase,
    private readonly updateProductLotUseCase: UpdateProductLotUseCase,
    private readonly findAllProductLotUseCase: FindAllProductLotUseCase,
    protected readonly findOneProductLotUseCase: FindOneProductLotUseCase,
    protected readonly hardDeleteProductLotUseCase: HardDeleteProductLotUseCase,
    protected readonly softDeleteProductLotUseCase: SoftDeleteProductLotUseCase,
    protected readonly restoreProductLotUseCase: RestoreProductLotUseCase,
  ) {
    super({
      mapper: ProductLotMapper,
      hardDelete: hardDeleteProductLotUseCase,
      softDelete: softDeleteProductLotUseCase,
      restore: restoreProductLotUseCase,
      findOne: findOneProductLotUseCase,
    });
  }
  @Post()
  override async create(
    @Body() dto: CreateProductLotDto,
  ): Promise<ProductLotResponse> {
    return ProductLotMapper.toResponse(
      await this.createProductLotUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductLotDto,
  ): Promise<ProductLotResponse> {
    return ProductLotMapper.toResponse(
      await this.updateProductLotUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<ProductLotResponse>> {
    return ProductLotMapper.toResponseList(
      await this.findAllProductLotUseCase.execute(query),
    );
  }
}

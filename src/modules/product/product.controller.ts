import {
  Controller,
  Patch,
  Body,
  Param,
  Post,
  Query,
  Get,
} from '@nestjs/common';
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
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('product')
export class ProductController extends BaseController<
  Product,
  ProductOrm,
  ProductResponse,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly activeProductUseCase: ActiveProductUseCase, // custom
    protected readonly findOneProductUseCase: FindOneProductUseCase,
    protected readonly hardDeleteProductUseCase: HardDeleteProductUseCase,
    protected readonly softDeleteProductUseCase: SoftDeleteProductUseCase,
    protected readonly restoreProductUseCase: RestoreProductUseCase,
  ) {
    super({
      findOne: findOneProductUseCase,
      mapper: ProductMapper,
      hardDelete: hardDeleteProductUseCase,
      softDelete: softDeleteProductUseCase,
      restore: restoreProductUseCase,
    });
  }
  @Post()
  override async create(
    @Body() dto: CreateProductDto,
  ): Promise<ProductResponse> {
    return ProductMapper.toResponse(
      await this.createProductUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponse> {
    return ProductMapper.toResponse(
      await this.updateProductUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<ProductResponse>> {
    return ProductMapper.toResponseList(
      await this.findAllProductUseCase.execute(query),
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

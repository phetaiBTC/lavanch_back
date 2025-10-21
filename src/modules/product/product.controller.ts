import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-Product.dto';
import { UpdateProductDto } from './dto/update-Product.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateProductUseCase } from './application/commands/create-Product.usecase';
import { UpdateProductUseCase } from './application/commands/update-Product.usecase';
import { HardDeleteProductUseCase } from './application/commands/hard-Product.usecase';
import { SoftDeleteProductUseCase } from './application/commands/soft-Product.usecase';
import { RestoreProductUseCase } from './application/commands/restore-Product.usecase';
import { FindOneProductUseCase } from './application/queries/findOne-Product.usecase';
import { FindAllProductUseCase } from './application/queries/find-Product.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ProductMapper } from './infrastructure/product.mapper';
import { ProductResponse } from './interface/product.interface';
import { ActiveProductUseCase } from './application/commands/active-Product.usecase';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly hardDeleteProductUseCase: HardDeleteProductUseCase,
    private readonly softDeleteProductUseCase: SoftDeleteProductUseCase,
    private readonly restoreProductUseCase: RestoreProductUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly findAllProductUseCase: FindAllProductUseCase,
    private readonly activeProductUseCase: ActiveProductUseCase,
  ) {}
  @Post() async create(
    @Body() dto: CreateProductDto,
  ): Promise<ProductResponse> {
    return ProductMapper.toResponse(
      await this.createProductUseCase.execute(dto),
    );
  }
  @Get() async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<ProductResponse>> {
    return ProductMapper.toResponseList(
      await this.findAllProductUseCase.execute(query),
    );
  }
  @Get(':id') async findOne(@Param('id') id: number): Promise<ProductResponse> {
    return ProductMapper.toResponse(
      await this.findOneProductUseCase.execute(id),
    );
  }
  @Patch(':id') async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponse> {
    return ProductMapper.toResponse(
      await this.updateProductUseCase.execute(id, dto),
    );
  }
  
  @Patch('active-update/:id') async activeUpdate(
    @Param('id') id: number,
    @Body() dto: ActiveDto,
  ): Promise<ProductResponse> {
    return ProductMapper.toResponse(
      await this.activeProductUseCase.execute(id, dto),
    );
  }

  @Delete('soft/:id') async softDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.softDeleteProductUseCase.execute(+id);
  }
  @Delete('hard/:id') async hardDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.hardDeleteProductUseCase.execute(+id);
  }
  @Patch('restore/:id') async restore(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.restoreProductUseCase.execute(+id);
  }
}

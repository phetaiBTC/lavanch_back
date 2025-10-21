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
import { CreateProductUnitDto } from './dto/create-ProductUnit.dto';
import { UpdateProductUnitDto } from './dto/update-ProductUnit.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateProductUnitUseCase } from './application/commands/create-ProductUnit.usecase';
import { UpdateProductUnitUseCase } from './application/commands/update-ProductUnit.usecase';
import { HardDeleteProductUnitUseCase } from './application/commands/hard-ProductUnit.usecase';
import { SoftDeleteProductUnitUseCase } from './application/commands/soft-ProductUnit.usecase';
import { RestoreProductUnitUseCase } from './application/commands/restore-ProductUnit.usecase';
import { FindOneProductUnitUseCase } from './application/queries/findOne-ProductUnit.usecase';
import { FindAllProductUnitUseCase } from './application/queries/find-ProductUnit.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ProductUnitMapper } from './infrastructure/product_unit.mapper';
import { ProductUnitResponse } from './interface/product_unit.interface';
@Controller('product_unit')
export class ProductUnitController {
  constructor(
    private readonly createProductUnitUseCase: CreateProductUnitUseCase,
    private readonly updateProductUnitUseCase: UpdateProductUnitUseCase,
    private readonly hardDeleteProductUnitUseCase: HardDeleteProductUnitUseCase,
    private readonly softDeleteProductUnitUseCase: SoftDeleteProductUnitUseCase,
    private readonly restoreProductUnitUseCase: RestoreProductUnitUseCase,
    private readonly findOneProductUnitUseCase: FindOneProductUnitUseCase,
    private readonly findAllProductUnitUseCase: FindAllProductUnitUseCase,
  ) {}
  @Post() async create(
    @Body() dto: CreateProductUnitDto,
  ): Promise<ProductUnitResponse> {
    return ProductUnitMapper.toResponse(
      await this.createProductUnitUseCase.execute(dto),
    );
  }
  @Get() async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<ProductUnitResponse>> {
    return ProductUnitMapper.toResponseList(
      await this.findAllProductUnitUseCase.execute(query),
    );
  }
  @Get(':id') async findOne(
    @Param('id') id: number,
  ): Promise<ProductUnitResponse> {
    return ProductUnitMapper.toResponse(
      await this.findOneProductUnitUseCase.execute(id),
    );
  }
  @Patch(':id') async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductUnitDto,
  ): Promise<ProductUnitResponse> {
    return ProductUnitMapper.toResponse(
      await this.updateProductUnitUseCase.execute(id, dto),
    );
  }
  @Delete('soft/:id') async softDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.softDeleteProductUnitUseCase.execute(+id);
  }
  @Delete('hard/:id') async hardDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.hardDeleteProductUnitUseCase.execute(+id);
  }
  @Patch('restore/:id') async restore(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.restoreProductUnitUseCase.execute(+id);
  }
}

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
import { CreateProductVariantDto } from './dto/create-ProductVariant.dto';
import { UpdateProductVariantDto } from './dto/update-ProductVariant.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateProductVariantUseCase } from './application/commands/create-ProductVariant.usecase';
import { UpdateProductVariantUseCase } from './application/commands/update-ProductVariant.usecase';
import { HardDeleteProductVariantUseCase } from './application/commands/hard-ProductVariant.usecase';
import { SoftDeleteProductVariantUseCase } from './application/commands/soft-ProductVariant.usecase';
import { RestoreProductVariantUseCase } from './application/commands/restore-ProductVariant.usecase';
import { FindOneProductVariantUseCase } from './application/queries/findOne-ProductVariant.usecase';
import { FindAllProductVariantUseCase } from './application/queries/find-ProductVariant.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { ProductVariantMapper } from './infrastructure/product_variant.mapper';
import { ProductVariantResponse } from './interface/product_variant.interface';
import { ActiveProductVariantUseCase } from './application/commands/active-ProductVariant.usecase';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
@Controller('product_variant')
export class ProductVariantController {
  constructor(
    private readonly createProductVariantUseCase: CreateProductVariantUseCase,
    private readonly updateProductVariantUseCase: UpdateProductVariantUseCase,
    private readonly hardDeleteProductVariantUseCase: HardDeleteProductVariantUseCase,
    private readonly softDeleteProductVariantUseCase: SoftDeleteProductVariantUseCase,
    private readonly restoreProductVariantUseCase: RestoreProductVariantUseCase,
    private readonly findOneProductVariantUseCase: FindOneProductVariantUseCase,
    private readonly findAllProductVariantUseCase: FindAllProductVariantUseCase,
    private readonly activeProductVariantUseCase: ActiveProductVariantUseCase,
  ) {}
  @Post() async create(
    @Body() dto: CreateProductVariantDto,
  ): Promise<ProductVariantResponse> {
    return ProductVariantMapper.toResponse(
      await this.createProductVariantUseCase.execute(dto),
    );
  }
  @Get() async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<ProductVariantResponse>> {
    return ProductVariantMapper.toResponseList(
      await this.findAllProductVariantUseCase.execute(query),
    );
  }
  @Get(':id') async findOne(
    @Param('id') id: number,
  ): Promise<ProductVariantResponse> {
    return ProductVariantMapper.toResponse(
      await this.findOneProductVariantUseCase.execute(id),
    );
  }
  @Patch(':id') async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductVariantDto,
  ): Promise<ProductVariantResponse> {
    return ProductVariantMapper.toResponse(
      await this.updateProductVariantUseCase.execute(id, dto),
    );
  }
  @Patch('active-update/:id') async activeUpdate(
    @Param('id') id: number,
    @Body() dto: ActiveDto,
  ): Promise<ProductVariantResponse> {
    return ProductVariantMapper.toResponse(
      await this.activeProductVariantUseCase.execute(id, dto),
    );
  }

  @Delete('soft/:id') async softDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.softDeleteProductVariantUseCase.execute(+id);
  }
  @Delete('hard/:id') async hardDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.hardDeleteProductVariantUseCase.execute(+id);
  }
  @Patch('restore/:id') async restore(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.restoreProductVariantUseCase.execute(+id);
  }
}

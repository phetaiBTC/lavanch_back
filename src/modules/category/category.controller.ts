import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Category } from './domain/category.entity';
import { CategoryOrm } from 'src/database/typeorm/category.orm-entity';
import { CategoryResponse } from './interface/category.interface';
import { CreateCategoryDto } from './dto/create-Category.dto';
import { UpdateCategoryDto } from './dto/update-Category.dto';
import { CategoryMapper } from './infrastructure/category.mapper';
import { CreateCategoryUseCase } from './application/commands/create-Category.usecase';
import { UpdateCategoryUseCase } from './application/commands/update-Category.usecase';
import { FindOneCategoryUseCase } from './application/queries/findOne-Category.usecase';
import { FindAllCategoryUseCase } from './application/queries/find-Category.usecase';
import { HardDeleteCategoryUseCase } from './application/commands/hard-Category.usecase';
import { SoftDeleteCategoryUseCase } from './application/commands/soft-Category.usecase';
import { RestoreCategoryUseCase } from './application/commands/restore-Category.usecase';
import { UpdateActiveCategoryUseCase } from './application/commands/ีactive-Category.usecase';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
import { BaseController } from 'src/shared/BaseModule/base.controller';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';

@Controller('category')
export class CategoryController extends BaseController<
  Category,
  CategoryOrm,
  CategoryResponse,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(
    protected readonly findOneCategoryUseCase: FindOneCategoryUseCase,
    protected readonly hardDeleteCategoryUseCase: HardDeleteCategoryUseCase,
    protected readonly softDeleteCategoryUseCase: SoftDeleteCategoryUseCase,
    protected readonly restoreCategoryUseCase: RestoreCategoryUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
    private readonly updateActiveCategoryUseCase: UpdateActiveCategoryUseCase, // custom
  ) {
    super({
      mapper: CategoryMapper,
      findOne: findOneCategoryUseCase,
      softDelete: softDeleteCategoryUseCase,
      hardDelete: hardDeleteCategoryUseCase,
      restore: restoreCategoryUseCase,
    });
  }

  // custom endpoint สำหรับ active update
  @Patch('active-update/:id')
  async activeUpdate(
    @Param('id') id: number,
    @Body() dto: ActiveDto,
  ): Promise<CategoryResponse> {
    return CategoryMapper.toResponse(
      await this.updateActiveCategoryUseCase.execute(id, dto),
    );
  }

  @Post()
  override async create(
    @Body() dto: CreateCategoryDto,
  ): Promise<CategoryResponse> {
    return CategoryMapper.toResponse(
      await this.createCategoryUseCase.execute(dto),
    );
  }

  @Patch(':id')
  override async update(
    @Param('id') id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<CategoryResponse> {
    return CategoryMapper.toResponse(
      await this.updateCategoryUseCase.execute(id, dto),
    );
  }

  @Get()
  override async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<CategoryResponse>> {
    return CategoryMapper.toResponseList(
      await this.findAllCategoryUseCase.execute(query),
    );
  }
}

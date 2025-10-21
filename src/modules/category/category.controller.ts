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
import { CreateCategoryDto } from './dto/create-Category.dto';
import { UpdateCategoryDto } from './dto/update-Category.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateCategoryUseCase } from './application/commands/create-Category.usecase';
import { UpdateCategoryUseCase } from './application/commands/update-Category.usecase';
import { HardDeleteCategoryUseCase } from './application/commands/hard-Category.usecase';
import { SoftDeleteCategoryUseCase } from './application/commands/soft-Category.usecase';
import { RestoreCategoryUseCase } from './application/commands/restore-Category.usecase';
import { FindOneCategoryUseCase } from './application/queries/findOne-Category.usecase';
import { FindAllCategoryUseCase } from './application/queries/find-Category.usecase';
import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { CategoryMapper } from './infrastructure/category.mapper';
import { CategoryResponse } from './interface/category.interface';
import { ActiveDto } from 'src/shared/dto/avtive.dto';
import { UpdateActiveCategoryUseCase } from './application/commands/ีactive-Category.usecase';
@Controller('category')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly hardDeleteCategoryUseCase: HardDeleteCategoryUseCase,
    private readonly softDeleteCategoryUseCase: SoftDeleteCategoryUseCase,
    private readonly restoreCategoryUseCase: RestoreCategoryUseCase,
    private readonly findOneCategoryUseCase: FindOneCategoryUseCase,
    private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
    private readonly updateActiveCategoryUseCase: UpdateActiveCategoryUseCase,
  ) {}
  @Post() async create(
    @Body() dto: CreateCategoryDto,
  ): Promise<CategoryResponse> {
    return CategoryMapper.toResponse(
      await this.createCategoryUseCase.execute(dto),
    );
  }
  @Get() async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<CategoryResponse>> {
    return CategoryMapper.toResponseList(
      await this.findAllCategoryUseCase.execute(query),
    );
  }
  @Get(':id') async findOne(
    @Param('id') id: number,
  ): Promise<CategoryResponse> {
    return CategoryMapper.toResponse(
      await this.findOneCategoryUseCase.execute(id),
    );
  }
  @Patch(':id') async update(
    @Param('id') id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<CategoryResponse> {
    return CategoryMapper.toResponse(
      await this.updateCategoryUseCase.execute(id, dto),
    );
  }
  @Patch('active-update/:id') async activeUpdate(
    @Param('id') id: number,
    @Body() dto: ActiveDto,
  ): Promise<CategoryResponse> {
    return CategoryMapper.toResponse(
      await this.updateActiveCategoryUseCase.execute(id, dto),
    );
  }
  @Delete('soft/:id') async softDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.softDeleteCategoryUseCase.execute(+id);
  }
  @Delete('hard/:id') async hardDelete(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.hardDeleteCategoryUseCase.execute(+id);
  }
  @Patch('restore/:id') async restore(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    return await this.restoreCategoryUseCase.execute(+id);
  }
}

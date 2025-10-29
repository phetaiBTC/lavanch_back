import { Body, Controller, Param, Patch } from '@nestjs/common';
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
import { BaseController } from 'src/shared/BaseModule/BaseController';

@Controller('category')
export class CategoryController extends BaseController<
  Category,
  CategoryOrm,
  CategoryResponse,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(
    createCategoryUseCase: CreateCategoryUseCase,
    updateCategoryUseCase: UpdateCategoryUseCase,
    findOneCategoryUseCase: FindOneCategoryUseCase,
    findAllCategoryUseCase: FindAllCategoryUseCase,
    hardDeleteCategoryUseCase: HardDeleteCategoryUseCase,
    softDeleteCategoryUseCase: SoftDeleteCategoryUseCase,
    restoreCategoryUseCase: RestoreCategoryUseCase,
    private readonly updateActiveCategoryUseCase: UpdateActiveCategoryUseCase, // custom
  ) {
    super(
      CategoryMapper,
      createCategoryUseCase,
      updateCategoryUseCase,
      findOneCategoryUseCase,
      findAllCategoryUseCase,
      hardDeleteCategoryUseCase,
      softDeleteCategoryUseCase,
      restoreCategoryUseCase,
    );
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
}

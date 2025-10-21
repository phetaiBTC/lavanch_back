import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepositoryImpl } from './infrastructure/category.repository.impl';
import { CategoryController } from './category.controller';
import { CATEGORY_REPOSITORY } from './domain/category.repository';
import { CreateCategoryUseCase } from './application/commands/create-Category.usecase';
import { UpdateCategoryUseCase } from './application/commands/update-Category.usecase';
import { HardDeleteCategoryUseCase } from './application/commands/hard-Category.usecase';
import { SoftDeleteCategoryUseCase } from './application/commands/soft-Category.usecase';
import { RestoreCategoryUseCase } from './application/commands/restore-Category.usecase';
import { FindOneCategoryUseCase } from './application/queries/findOne-Category.usecase';
import { FindAllCategoryUseCase } from './application/queries/find-Category.usecase';
import { CategoryOrm } from 'src/database/typeorm/category.orm-entity';
import { UpdateActiveCategoryUseCase } from './application/commands/ีactive-Category.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([CategoryOrm])],
  controllers: [CategoryController],
  providers: [
    { provide: CATEGORY_REPOSITORY, useClass: CategoryRepositoryImpl },
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    HardDeleteCategoryUseCase,
    SoftDeleteCategoryUseCase,
    RestoreCategoryUseCase,
    FindOneCategoryUseCase,
    FindAllCategoryUseCase,
    UpdateActiveCategoryUseCase
  ],
  exports: [
    { provide: CATEGORY_REPOSITORY, useClass: CategoryRepositoryImpl },
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    HardDeleteCategoryUseCase,
    SoftDeleteCategoryUseCase,
    RestoreCategoryUseCase,
    FindOneCategoryUseCase,
    FindAllCategoryUseCase,
    UpdateActiveCategoryUseCase
  ]
})
export class CategoryModule {}


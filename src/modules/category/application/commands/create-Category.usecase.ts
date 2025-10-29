import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../../domain/category.repository';
import { Category } from '../../domain/category.entity';
import { CreateCategoryDto } from '../../dto/create-Category.dto';
import { UpdateCategoryUseCase } from './update-Category.usecase';
import { CategoryMapper } from '../../infrastructure/category.mapper';
import { FindOneCategoryUseCase } from '../queries/findOne-Category.usecase';
import { FindNameCategoryUseCase } from '../queries/findName-Category.usecase';
import { UniqueValidatorService } from 'src/shared/utils/pass.notfound.util';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
    private readonly usecaseFindOne: FindOneCategoryUseCase,
    private readonly usecaseFindName: FindNameCategoryUseCase,

    private readonly validateUniqueField: UniqueValidatorService,
  ) {}

  async execute(dto: CreateCategoryDto): Promise<Category> {
    const parent = await this.valdation_category(dto);
    return this.categoryRepo.save(
      new Category({
        ...dto,
        parent,
      }),
    );
  }

  async valdation_category(dto: CreateCategoryDto): Promise<Category | null> {
    await this.validateUniqueField.validateUniqueField(
      () => this.usecaseFindName.execute(dto.name),
      'Category name already exists',
    );
    if (dto.parentId) {
      const parent = await this.usecaseFindOne.execute(dto.parentId);
      return parent;
    }
    return null;
  }
}

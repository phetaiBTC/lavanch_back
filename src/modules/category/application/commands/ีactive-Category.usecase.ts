import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../../domain/category.repository';
import { Category } from '../../domain/category.entity';
import { ActiveCategoryDto } from '../../dto/active-Category.dto';
import { FindOneCategoryUseCase } from '../queries/findOne-Category.usecase';

@Injectable()
export class UpdateActiveCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
    private readonly usecaseFindOne: FindOneCategoryUseCase,
  ) {}

  async execute(id: number, dto: ActiveCategoryDto): Promise<Category> {
    const category = await this.usecaseFindOne.execute(id);
    const updatedCategory = category.update({ is_active: dto.is_active });
    return this.categoryRepo.save(updatedCategory);
  }
}

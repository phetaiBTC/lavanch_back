import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../../domain/category.repository';
import { Category } from '../../domain/category.entity';
import { ActiveCategoryDto } from '../../dto/active-Category.dto';

@Injectable()
export class UpdateActiveCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(id: number, dto: ActiveCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new BadRequestException('Category not found');

    if (dto.is_active !== undefined) category.is_active = dto.is_active;

    return this.categoryRepo.update(category);
  }
}

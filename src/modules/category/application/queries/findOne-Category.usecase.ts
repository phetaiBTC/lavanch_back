import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../../domain/category.repository';
import { Category } from '../../domain/category.entity';
@Injectable()
export class FindOneCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
  ) {}
  async execute(id: number): Promise<Category> {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}

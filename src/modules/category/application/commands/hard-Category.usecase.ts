import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../../domain/category.repository';
@Injectable()
export class HardDeleteCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    if (category.children.length > 0)
      throw new BadRequestException('Cannot delete Category has children');
    return this.categoryRepo.hardDelete(id);
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../../domain/category.repository';
@Injectable()
export class SoftDeleteCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const category = await this.categoryRepo.findById(id);
    if (!category)
      throw new NotFoundException('Cannot delete Category not found');
    if (category.value.children.length > 0)
      throw new BadRequestException('Cannot delete Category has children');
    return this.categoryRepo.softDelete(id);
  }
}

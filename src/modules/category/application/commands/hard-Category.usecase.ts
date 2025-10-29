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
import { FindOneCategoryUseCase } from '../queries/findOne-Category.usecase';
@Injectable()
export class HardDeleteCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
    private readonly usecaseFindOne: FindOneCategoryUseCase,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const category = await this.usecaseFindOne.execute(id);
    if (category.value.children.length > 0)
      throw new BadRequestException('Cannot delete Category has children');
    return this.categoryRepo.hardDelete(id);
  }
}

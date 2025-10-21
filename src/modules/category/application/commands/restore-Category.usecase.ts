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
export class RestoreCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
  ) {}
  async execute(id: number): Promise<{ message: string }> {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return this.categoryRepo.restore(id);
  }
}

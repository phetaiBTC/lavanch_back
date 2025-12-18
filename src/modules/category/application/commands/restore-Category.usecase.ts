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
export class RestoreCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
    private readonly usecaseFindOne: FindOneCategoryUseCase,
  ) {}
  async execute(id: number[]): Promise<{ message: string }> {
    // const category = await this.categoryRepo.findById(id);
    await Promise.all(id.map((id) => this.usecaseFindOne.execute(id)));
    return this.categoryRepo.restore(id);
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../../domain/category.repository';
import { Category } from '../../domain/category.entity';
import { CreateCategoryDto } from '../../dto/create-Category.dto';
import { UpdateCategoryUseCase } from './update-Category.usecase';
import { CategoryMapper } from '../../infrastructure/category.mapper';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,

    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  async execute(dto: CreateCategoryDto): Promise<Category> {
    let parent: Category | null = null;
    if (dto.parentId) {
      parent = await this.categoryRepo.findById(dto.parentId);
      if (!parent) throw new BadRequestException('Parent category not found');
    }

    const existingCategory = await this.categoryRepo.findByName(dto.name);
    if (existingCategory)
      throw new BadRequestException('Category already exists');

    const category = new Category({
      name: dto.name,
      description: dto.description,
      parent: parent,
      is_active: dto.is_active ?? true,
    });

    return this.categoryRepo.create(category);
  }
}

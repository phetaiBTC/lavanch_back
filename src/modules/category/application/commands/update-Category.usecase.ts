import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../../domain/category.repository';
import { Category } from '../../domain/category.entity';
import { UpdateCategoryDto } from '../../dto/update-Category.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);

    const existingCategory = await this.categoryRepo.findByName(dto.name);
    if (existingCategory && existingCategory.id !== id)
      throw new BadRequestException('Category already exists');

    if (dto.parentId) {
      const parent = await this.categoryRepo.findById(dto.parentId);
      if (!parent) throw new BadRequestException('Parent category not found');
      category.parent = parent;
    }
    if (dto.childrenIds && dto.childrenIds.length > 0) {
      const children = await Promise.all(
        dto.childrenIds.map((id) => this.categoryRepo.findById(id)),
      );
      if (children.some((c): c is null => c === null))
        throw new BadRequestException('Children category not found');
      category.children = children.filter((c): c is Category => c != null);
    }
    if (dto.name !== undefined) category.name = dto.name;
    if (dto.description !== undefined) category.description = dto.description;

    return this.categoryRepo.update(category);
  }
}

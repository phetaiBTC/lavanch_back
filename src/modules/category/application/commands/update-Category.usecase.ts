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
import { Category } from '../../domain/category.entity';
import { UpdateCategoryDto } from '../../dto/update-Category.dto';
import { UniqueValidatorService } from 'src/shared/utils/pass.notfound.util';
import { FindOneCategoryUseCase } from '../queries/findOne-Category.usecase';
import { FindNameCategoryUseCase } from '../queries/findName-Category.usecase';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepo: ICategoryRepository,

    private readonly validateUniqueField: UniqueValidatorService,
    private readonly usecaseFindOne: FindOneCategoryUseCase,
    private readonly usecaseFindName: FindNameCategoryUseCase,
  ) {}

  async execute(id: number, dto: UpdateCategoryDto): Promise<Category> {
    await this.validation_category_name(id, dto);
    const category = await this.validation_category(id, dto);
    return this.categoryRepo.save(category);
  }

  async validation_category_name(id: number, dto: UpdateCategoryDto) {
    await this.validateUniqueField.validateUniqueField(async () => {
      const variant = await this.usecaseFindName.execute(dto.name);
      return variant?.value.id === id ? undefined : variant;
    }, 'Category already exists');
  }

  async validation_category(
    id: number,
    dto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.usecaseFindOne.execute(id);

    if (dto.parentId && dto.parentId !== category.value.parent?.value.id) {
      const parent = await this.usecaseFindOne.execute(dto.parentId);
      category.update({ parent });
    }
    if (dto.childrenIds && dto.childrenIds.length) {
      const children = await Promise.all(
        dto.childrenIds.map((id) =>
          this.usecaseFindOne.execute(id).then((c) => c ?? null),
        ),
      );
      const validChildren = children.filter((c): c is Category => c !== null);
      if (validChildren.length !== dto.childrenIds.length)
        throw new BadRequestException('Children category not found');
      category.update({ children: validChildren });
    }
    if (dto.name !== undefined) category.value.name = dto.name;
    if (dto.description !== undefined)
      category.value.description = dto.description;
    return category;
  }
}

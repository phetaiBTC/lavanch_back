import { PaginatedResponse } from 'src/shared/interface/pagination.interface';
import { Category } from './category.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IRemoveRepository } from 'src/shared/interface/removeRepository.interface';
export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');
export interface ICategoryRepository extends IRemoveRepository {
  findAll(query: PaginationDto): Promise<PaginatedResponse<Category>>;
  findById(id: number): Promise<Category | null>;
  create(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
}

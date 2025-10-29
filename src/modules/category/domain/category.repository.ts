import { Category } from './category.entity';
import { IBaseRepository } from 'src/shared/BaseModule/domain/base.repository';
export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');
export interface ICategoryRepository extends IBaseRepository<Category> {
  findByName(name: string): Promise<Category | null>;
}

import { Images } from './Images.entity';

export const Images_REPOSITORY = Symbol(
  'Images_REPOSITORY'.toLocaleUpperCase(),
);

export interface IImagesRepository {
  save(data: Images[]): Promise<Images[]>;
  delete(id: number): Promise<{ message: string }>;
  findOne(id: number): Promise<Images | null>;
}

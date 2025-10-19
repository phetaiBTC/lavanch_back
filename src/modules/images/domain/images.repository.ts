import { Images } from './images.entity';

export const IMAGES_REPOSITORY = Symbol('IMAGES_REPOSITORY');

export interface IImagesRepository {
  save(data: Images[]): Promise<Images[]>;
  delete(id: number): Promise<{ message: string }>;
  findOne(id: number): Promise<Images | null>;
}

import { InjectRepository } from '@nestjs/typeorm';
import { ImagesOrm } from 'src/database/typeorm/image.orm-entity';
import { Repository } from 'typeorm';
import { IImagesRepository } from '../domain/images.repository';
import { Injectable } from '@nestjs/common';
import { Images } from '../domain/images.entity';
import { ImagesMapper } from './images.mapper';

@Injectable()
export class ImagesRepositoryImpl implements IImagesRepository {
  constructor(
    @InjectRepository(ImagesOrm)
    private readonly imagesRepository: Repository<ImagesOrm>,
  ) {}
  async save(images: Images[]): Promise<Images[]> {
    const query = await this.imagesRepository.save(
      images.map((image) => ImagesMapper.toSchema(image)),
    );
    return query.map((image) => ImagesMapper.toDomain(image));
  }
  async delete(id: number): Promise<{ message: string }> {
    await this.imagesRepository.delete(id);
    return { message: 'delete sussessfully' };
  }
  async findOne(id: number): Promise<Images | null> {
    const image = await this.imagesRepository.findOneBy({ id });
    return image ? ImagesMapper.toDomain(image) : null;
  }
}

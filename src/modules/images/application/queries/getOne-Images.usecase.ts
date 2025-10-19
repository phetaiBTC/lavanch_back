import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type IImagesRepository,
  IMAGES_REPOSITORY,
} from '../../domain/images.repository';
import { Images } from '../../domain/images.entity';

@Injectable()
export class GetOneImagesUseCase {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private readonly imageRepository: IImagesRepository,
  ) {}

  async execute(id: number): Promise<Images> {
    const image = await this.imageRepository.findOne(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }
}

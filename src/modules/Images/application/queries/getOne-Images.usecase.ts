import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type IImagesRepository,
  Images_REPOSITORY,
} from '../../domain/Images.repository';
import { Images } from '../../domain/Images.entity';

@Injectable()
export class GetOneImagesUseCase {
  constructor(
    @Inject(Images_REPOSITORY)
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

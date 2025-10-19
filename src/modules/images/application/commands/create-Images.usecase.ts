import { Inject, Injectable } from '@nestjs/common';
import {
  type IImagesRepository,
  IMAGES_REPOSITORY,
} from '../../domain/images.repository';
import { Images } from '../../domain/images.entity';
import { UploadFileUseCase } from 'src/modules/files/application/upload-file.usecase';

@Injectable()
export class CreateImagesUseCase {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private readonly imageRepository: IImagesRepository,
    private readonly uploadFileUseCase: UploadFileUseCase,
  ) {}

  async execute(files: Express.Multer.File[]): Promise<Images[]> {
    const query = await this.uploadFileUseCase.execute(files);
    const images: Images[] = query.map((image) => {
      const images = new Images({
        url: image.url,
        key: image.key,
      });
      return images;
    });
    return await this.imageRepository.save(images);
  }
}

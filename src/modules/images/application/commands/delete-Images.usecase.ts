import { Inject, Injectable } from '@nestjs/common';
import {
  type IImagesRepository,
  IMAGES_REPOSITORY,
} from '../../domain/images.repository';
import { GetOneImagesUseCase } from '../queries/getOne-Images.usecase';
import { DeleteFileUseCase } from 'src/modules/files/application/detele-file.usecase';

@Injectable()
export class DeleteImagesUseCase {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private readonly imageRepository: IImagesRepository,
    private readonly getOneImagesUseCase: GetOneImagesUseCase,
    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    const image = await this.getOneImagesUseCase.execute(id);
    await this.deleteFileUseCase.execute(image.value.key);
    return await this.imageRepository.delete(id);
  }
}

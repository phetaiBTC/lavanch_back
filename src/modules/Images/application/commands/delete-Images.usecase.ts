import { Inject, Injectable } from '@nestjs/common';
import {
  type IImagesRepository,
  Images_REPOSITORY,
} from '../../domain/Images.repository';
import { GetOneImagesUseCase } from '../queries/getOne-Images.usecase';
import { DeleteFileUseCase } from 'src/modules/File/application/detele-file.usecase';

@Injectable()
export class DeleteImagesUseCase {
  constructor(
    @Inject(Images_REPOSITORY)
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

import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateImagesUseCase } from './application/commands/create-Images.usecase';
import { DeleteImagesUseCase } from './application/commands/delete-Images.usecase';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly createImagesUseCase: CreateImagesUseCase,
    private readonly deleteImagesUseCase: DeleteImagesUseCase,
  ) {}
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      dest: './tmp',
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  )
  async save(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.createImagesUseCase.execute(files);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.deleteImagesUseCase.execute(id);
  }
}

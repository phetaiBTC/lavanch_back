import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from './application/upload-file.usecase';

@Controller('files')
export class FileController {
  constructor(private readonly uploadUseCase: UploadFileUseCase) {}

  @Post('upload-multi')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      dest: './tmp',
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  )
  async uploadMulti(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.uploadUseCase.execute(files);
  }
}

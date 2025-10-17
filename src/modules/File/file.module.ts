import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadFileUseCase } from './application/upload-file.usecase';
import { DeleteFileUseCase } from './application/detele-file.usecase';

@Module({
  imports: [ConfigModule],
  providers: [UploadFileUseCase, DeleteFileUseCase],
  exports: [UploadFileUseCase, DeleteFileUseCase],
})
export class FileModule {}

import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from './application/upload-file.usecase';

@Controller('files')
export class FileController {
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  private readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
  ];

  constructor(private readonly uploadUseCase: UploadFileUseCase) {}

  @Post('upload-multi')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      dest: './tmp',
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async uploadMulti(@UploadedFiles() files: Express.Multer.File[]) {
    // Validate files
    if (files && files.length > 0) {
      for (const file of files) {
        // Validate file type
        if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          throw new BadRequestException({
            message: 'Invalid file type',
            error: 'INVALID_FILE_TYPE',
            details: {
              fileName: file.originalname,
              fileType: file.mimetype,
              allowedTypes: 'JPEG, PNG, JPG',
              allowedMimeTypes: this.ALLOWED_MIME_TYPES,
            },
          });
        }

        // Validate file size
        if (file.size > this.MAX_FILE_SIZE) {
          const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
          const maxSizeMB = (this.MAX_FILE_SIZE / (1024 * 1024)).toFixed(2);
          throw new BadRequestException({
            message: 'File size exceeds maximum allowed size',
            error: 'FILE_TOO_LARGE',
            details: {
              fileName: file.originalname,
              fileSize: `${fileSizeMB}MB`,
              maxSize: `${maxSizeMB}MB`,
              fileSizeBytes: file.size,
              maxSizeBytes: this.MAX_FILE_SIZE,
            },
          });
        }
      }
    }

    return await this.uploadUseCase.execute(files);
  }
}

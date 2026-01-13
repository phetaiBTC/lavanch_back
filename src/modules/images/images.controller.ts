import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateImagesUseCase } from './application/commands/create-Images.usecase';
import { DeleteImagesUseCase } from './application/commands/delete-Images.usecase';

@Controller('images')
export class ImagesController {
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  private readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
  ];

  constructor(
    private readonly createImagesUseCase: CreateImagesUseCase,
    private readonly deleteImagesUseCase: DeleteImagesUseCase,
  ) {}
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      dest: './tmp',
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async save(@UploadedFiles() files: Express.Multer.File[]) {
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

    return await this.createImagesUseCase.execute(files);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.deleteImagesUseCase.execute(id);
  }
}
